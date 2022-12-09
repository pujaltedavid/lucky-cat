import React, { useContext, useEffect, useState } from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { getLanguage } from '../firebase'
import {
  translateCatToHuman,
  translateHumanToCat,
  updateLanguage,
} from '../functions/Translate'

const inputContext = React.createContext()
const waitAlgorithmContext = React.createContext()
const getInputContext = React.createContext()
const outputContext = React.createContext()
const humanToCatContext = React.createContext()
const toggleHumanToCatContext = React.createContext()
const languageContext = React.createContext()

export const useInput = () => useContext(inputContext)
export const useWaitAlgorithm = () => useContext(waitAlgorithmContext)
export const useGetInput = () => useContext(getInputContext)
export const useOutput = () => useContext(outputContext)
export const useIsHumanToCat = () => useContext(humanToCatContext)
export const useToggleHumanToCat = () => useContext(toggleHumanToCatContext)
export const useLanguage = () => useContext(languageContext)

/*
// Use this whenever the user inputs
//const typingContext = React.createContext()
//export const useTyping = () => useContext(typingContext)
// const [typing, setTyping] = useState(false)  // old typing state
      <typingContext.Provider value={{ typing, setTyping }}>

      </typingContext.Provider>

*/

const removeLoader = () => {
  let el = document.getElementById('loader')
  if (el) {
    el.classList.add('transparent')
    setTimeout(el => el.remove(), 1000, el)
  }
}

const getGeoInfo = async () => {
  const res = await fetch('https://ipapi.co/json/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
  const data = await res.json()
  return data
}

const validUrl = url => {
  // get the language if the url is valid, else return false
  const lowerUrl = url.slice(1).toLowerCase()
  return ['ca', 'es', 'en'].includes(lowerUrl) ? lowerUrl : false
}

export const TranslatorContext = ({ children }) => {
  const [inputData, setInputData] = useState('')
  const [waitAlgorithm, setWaitAlgorithm] = useState(false)
  const [outputData, setOutputData] = useState('')
  const [humanToCat, setHumanToCat] = useState(true)
  const [languages, setLanguages] = useState({
    meow: false,
    es: false,
    ca: false,
    eng: false,
  })
  const [currentLanguage, setCurrentLanguage] = useState()
  const url = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const setup = async () => {
      // Use the language from url
      let lang = validUrl(url.pathname)

      // Use the language from ip location
      if (lang === false) {
        const location = await getGeoInfo()
        if (location.region_code === 'CT') lang = 'ca'
        else if (location.country === 'ES') lang = 'es'
        else lang = 'en'
      }

      // Fix the url
      if (lang !== url.pathname.slice(1)) navigate(`/${lang}`)

      setCurrentLanguage(lang)

      if (!languages?.meow) {
        await getLanguage('meow', arr => {
          updateLanguage('meow', arr)
          setLanguages(oldLanguages => ({ ...oldLanguages, meow: true }))
        })
      }
      if (!languages?.[lang]) {
        await getLanguage(lang, arr => {
          updateLanguage(lang, arr)
          setLanguages(oldLanguages => ({ ...oldLanguages, [lang]: true }))
        })
      }
    }

    setup()
  }, [])

  useEffect(() => {
    if (
      languages.meow &&
      languages[currentLanguage] &&
      inputData.trim() !== ''
    ) {
      setOutputData(
        humanToCat
          ? translateHumanToCat(
              inputData,
              currentLanguage,
              () => setWaitAlgorithm(true),
              () => setWaitAlgorithm(false)
            )
          : translateCatToHuman(
              inputData,
              currentLanguage,
              () => setWaitAlgorithm(true),
              () => setWaitAlgorithm(false)
            )
      )
    } else setOutputData('')
  }, [inputData])

  const toggleHumanToCat = () =>
    setHumanToCat(oldHumanToCat => {
      // To avoid lag on the animation
      outputData !== '' && setInputData(outputData)
      return !oldHumanToCat
    })

  const changeLanguage = lang => {
    console.log('Changing language to', lang)
    navigate(`/${lang}`)
    setCurrentLanguage(oldLang => {
      // Avoid running when the language is already downloaded
      if (languages?.meow) {
        if (!languages[lang]) {
          getLanguage(lang, arr => {
            updateLanguage(lang, arr)
            setLanguages(oldLanguages => ({
              ...oldLanguages,
              [lang]: true,
            }))
          })
        }
        return lang
      }
      // Do not update language if meow language is not even ready
      return oldLang
    })
  }

  return (
    <inputContext.Provider value={setInputData}>
      <waitAlgorithmContext.Provider value={waitAlgorithm}>
        <getInputContext.Provider value={inputData}>
          <outputContext.Provider value={outputData}>
            <humanToCatContext.Provider value={humanToCat}>
              <toggleHumanToCatContext.Provider value={toggleHumanToCat}>
                <languageContext.Provider
                  value={{ currentLanguage, changeLanguage }}
                >
                  {children}
                </languageContext.Provider>
              </toggleHumanToCatContext.Provider>
            </humanToCatContext.Provider>
          </outputContext.Provider>
        </getInputContext.Provider>
      </waitAlgorithmContext.Provider>
    </inputContext.Provider>
  )
}
