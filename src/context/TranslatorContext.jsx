import React, { useContext, useEffect, useState } from 'react'
import {
  translateCatToHuman,
  translateHumanToCat,
} from '../functions/Translate'

const inputContext = React.createContext()
// Use this whenever the user inputs
const typingContext = React.createContext()
const waitAlgorithmContext = React.createContext()
const getInputContext = React.createContext()
const outputContext = React.createContext()
const humanToCatContext = React.createContext()
const toggleHumanToCatContext = React.createContext()

export const useInput = () => useContext(inputContext)
export const useTyping = () => useContext(typingContext)
export const useWaitAlgorithm = () => useContext(waitAlgorithmContext)
export const useGetInput = () => useContext(getInputContext)
export const useOutput = () => useContext(outputContext)
export const useIsHumanToCat = () => useContext(humanToCatContext)
export const useToggleHumanToCat = () => useContext(toggleHumanToCatContext)

export const TranslatorContext = ({ children }) => {
  const [inputData, setInputData] = useState('')
  const [typing, setTyping] = useState(false)
  const [waitAlgorithm, setWaitAlgorithm] = useState(false)
  const [outputData, setOutputData] = useState('')
  const [humanToCat, setHumanToCat] = useState(true)

  useEffect(() => {
    if (inputData.trim() !== '') {
      setOutputData(
        humanToCat
          ? translateHumanToCat(
              inputData,
              () => setWaitAlgorithm(true),
              () => setWaitAlgorithm(false)
            )
          : translateCatToHuman(
              inputData,
              () => setWaitAlgorithm(true),
              () => setWaitAlgorithm(false)
            )
      )
    } else setOutputData('')
  }, [inputData])

  const toggleHumanToCat = () =>
    setHumanToCat(oldHumanToCat => {
      // To avoid lag on the animation
      outputData !== '' && setTimeout(() => setInputData(outputData), 500)
      return !oldHumanToCat
    })

  return (
    <inputContext.Provider value={setInputData}>
      <typingContext.Provider value={{ typing, setTyping }}>
        <waitAlgorithmContext.Provider value={typing || waitAlgorithm}>
          <getInputContext.Provider value={inputData}>
            <outputContext.Provider value={outputData}>
              <humanToCatContext.Provider value={humanToCat}>
                <toggleHumanToCatContext.Provider value={toggleHumanToCat}>
                  {children}
                </toggleHumanToCatContext.Provider>
              </humanToCatContext.Provider>
            </outputContext.Provider>
          </getInputContext.Provider>
        </waitAlgorithmContext.Provider>
      </typingContext.Provider>
    </inputContext.Provider>
  )
}
