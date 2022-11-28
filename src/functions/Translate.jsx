import unidecode from 'unidecode'
import { uploadLanguage } from '../firebase'
import { compressToUint8Array, decompressFromUint8Array } from 'lz-string'

var meowish = undefined

var spanishToCat = {}
var catalanToCat = {}
var englishToCat = {}

var catToSpanish = {}
var catToCatalan = {}
var catToEnglish = {}

const M = 'm M mm mM Mm MM mmm mmM mMm mMM Mmm MmM MMm MMM n N'.split(' ')
const E = 'e E ee eE Ee EE eee eeE eEe eEE Eee EeE EEe EEE i I'.split(' ')
const O = 'o O oo oO Oo OO ooo ooO oOo oOO Ooo OoO OOo OOO a A'.split(' ')
const W = 'w W ww wW Ww WW www wwW wWw wWW Www WwW WWw WWW u U'.split(' ')

const CAT = [M, E, O, W]

export function updateLanguage(lang, binaryArray) {
  // binaryArray is the bufferArray
  let arr = new Uint8Array(binaryArray)

  if (lang === 'meow') {
    meowish = decompressFromUint8Array(arr).split(',')
    console.log('Updating language meow...')
  } else {
    let language = decompressFromUint8Array(arr).split(',')
    console.log(`updating language ${lang}...`)

    // Fix the comma readed from ,,, as [..., '.', '', '', '?', ...]
    const wrongIndex = language.indexOf('')
    language[wrongIndex] = ','
    language.splice(wrongIndex + 1, 1)

    const s = language.length

    if (lang === 'es') {
      for (let i = 0; i < s; ++i) {
        spanishToCat[language[i]] = meowish[i]
        catToSpanish[meowish[i]] = language[i]
      }

      //console.log(spanishToCat)
      //console.log(catToSpanish)
    } else if (lang === 'ca') {
      for (let i = 0; i < s; ++i) {
        catalanToCat[language[i]] = meowish[i]
        catToCatalan[meowish[i]] = language[i]
      }

      //console.log(catalanToCat)
      //console.log(catToCatalan)
    } else if (lang === 'en') {
      for (let i = 0; i < s; ++i) {
        englishToCat[language[i]] = meowish[i]
        catToEnglish[meowish[i]] = language[i]
      }

      //console.log(englishToCat)
      //console.log(catToEnglish)
    }
  }
}

// Run this somewhere to upload the language to firebase storage
function uploadToDatabase() {
  uploadLanguage('meow', compressToUint8Array('put here the csv language'))
}

export function translateHumanToCat(
  input,
  language,
  callbackInit = () => {},
  callbackEnd = () => {}
) {
  callbackInit()

  let mapping = undefined
  let maxJ = undefined
  if (language === 'es') {
    mapping = spanishToCat
    maxJ = 26
  } else if (language === 'ca') {
    mapping = catalanToCat
    maxJ = 20
  } else {
    mapping = englishToCat
    maxJ = 32
  }

  const inp = unidecode(input.toLowerCase())
  let out = new Array()
  let i = 0
  let s = inp.length
  maxJ = Math.min(maxJ, s)
  let j = 0
  while (i < s) {
    if (inp[i] === ' ') {
      out.push(' ')
      ++i
      continue
    }
    j = maxJ
    while (j > 0) {
      let word = mapping[inp.slice(i, i + j)]
      if (word !== undefined) {
        out.push(word)
        i += j
        j = -1
      } else {
        j--
      }
    }
    // Skip character not in language (weird and specific case where the character is not unidecoded)
    // that is, if the character is not on language, i++ (if not, would create an infinite loop)
    if (j !== -1) ++i
  }

  // Convert from character to meow
  let meow = out.map((el, idx, arr) => {
    if (el === ' ') return el
    return (
      M[el.charCodeAt(0) - 65] +
      E[el.charCodeAt(1) - 65] +
      O[el.charCodeAt(2) - 65] +
      W[el.charCodeAt(3) - 65]
    )
  })

  // If there are no spaces between meows, add a comma
  // and then a space (like a regular language)
  let separatedMeow = new Array()
  s = meow.length
  separatedMeow.push(meow[0])

  for (let i = 1; i < s; ++i)
    separatedMeow.push(
      meow[i] !== ' ' && meow[i - 1] !== ' ' ? `, ${meow[i]}` : meow[i]
    )

  callbackEnd()

  return separatedMeow.join('')
}

function meowToMeowishSound(meow, k) {
  // meow contains only one sound
  return String.fromCharCode(CAT[k].indexOf(meow) + 65)
}

// TODO FALTA MIRAR SI INPUT NO ES PODRA CODIFICAR

export function translateCatToHuman(
  input,
  language,
  callbackInit = () => {},
  callbackEnd = () => {}
) {
  callbackInit()

  let mapping = undefined
  if (language === 'es') {
    mapping = catToSpanish
  } else if (language === 'ca') {
    mapping = catToCatalan
  } else {
    mapping = catToEnglish
  }

  const inp = input.split(' ')
  let out = new Array()
  let j = 0 // starting index in the word
  let jj = 0 // ending index in the word
  let k = 0 // indicates whether m, e, o or w
  let ss = 0 // length of the word
  let word = '' // meowish word dinamically generated

  // Kind of different from humanToCat, in this one we are iterating over a list of words, not string

  for (const meow of inp) {
    ss = meow.length - 1
    k = 0
    j = 0
    jj = 0
    word = ''

    // From meow to meowish (meow => AAAA)
    while (k < 4) {
      // find out how many characters are from this k-th part of meow
      // increase jj while it is from k
      while (jj < ss && CAT[k].includes(meow[jj + 1])) ++jj

      // Now, [j..jj] or slice(j, jj) is the k-th part of meow
      word += meowToMeowishSound(meow.slice(j, jj + 1), k)
      ++k
      ++jj
      j = jj
    }

    // From meowish to human
    out.push(mapping[word])
    // Add space if the meow word does not contain a comma aka is not finished
    if (jj > ss) out.push(' ')
  }

  callbackEnd()

  return out.join('')
}
