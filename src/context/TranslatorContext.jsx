import React, { useContext, useEffect, useState } from 'react'
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
  const [currentLanguage, setCurrentLanguage] = useState('en')

  useEffect(() => {
    !languages?.meow &&
      getLanguage('meow', arr => {
        updateLanguage('meow', arr)
        setLanguages(oldLanguages => ({ ...oldLanguages, meow: true }))
      })
    !languages?.en &&
      getLanguage('en', arr => {
        updateLanguage('en', arr)
        setLanguages(oldLanguages => ({ ...oldLanguages, en: true }))
      })
  }, [])

  useEffect(() => {
    if (inputData.trim() !== '') {
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
    setCurrentLanguage(oldLang => {
      // Avoid running when the language is already downloaded
      if (languages?.meow && !languages[currentLanguage]) {
        getLanguage(currentLanguage, arr => {
          updateLanguage(currentLanguage, arr)
          setLanguages(oldLanguages => ({
            ...oldLanguages,
            [currentLanguage]: true,
          }))
        })
      }
      return lang
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
