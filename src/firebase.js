// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getBytes } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// To work with indexedDB for storing language binary data
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const storage = getStorage()

export const uploadLanguage = (lang, bytes) => {
  const storageRef = ref(storage, lang)

  uploadBytes(storageRef, bytes).then(snapshot => {
    console.log('Uploaded language', lang)
  })
}

export const getLanguage = async (lang, then = () => {}) => {
  if (!indexedDB) {
    console.log('Could not use indexedDB')
    const bytes = await getBytes(ref(storage, lang))
    console.log('Downloaded language', lang)
    then(bytes)
  } else {
    const request = indexedDB.open('LuckyCatData', 1)

    request.onerror = async e => {
      console.log('Could not use indexedDB')
      console.error(e)
      const bytes = await getBytes(ref(storage, lang))
      console.log('Downloaded language', lang)
      then(bytes)
    }

    request.onupgradeneeded = () => {
      const db = request.result

      const store = db.createObjectStore('bin', { keyPath: 'id' })
    }

    request.onsuccess = async () => {
      const db = request.result

      const transaction = db.transaction('bin', 'readwrite')
      const store = transaction.objectStore('bin')

      const cursorRequest = store.openCursor(lang)
      cursorRequest.onsuccess = async e => {
        const cursor = e.target.result
        // The language is on the DB, get it and call then()
        if (cursor) {
          console.log(lang, 'is on indexedDB')
          const query = store.get(lang)
          query.onsuccess = () => {
            console.log('Downloaded language from indexedDB')
            const bytes = query.result.data
            then(bytes)
          }
        }
        // The language is not on the DB, download it, put on the DB and call then()
        else {
          const bytes = await getBytes(ref(storage, lang))

          const transaction2 = db.transaction('bin', 'readwrite')
          const store2 = transaction2.objectStore('bin')
          store2.put({ id: lang, data: bytes })

          console.log('Downloaded language', lang)
          console.log(lang, 'is now on indexedDB')
          then(bytes)
        }
      }
    }
  }
}
