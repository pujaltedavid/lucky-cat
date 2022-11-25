import React, { useContext, useEffect, useState } from 'react'
import {
  translateCatToHuman,
  translateHumanToCat,
} from '../functions/Translate'

const inputContext = React.createContext()
const getInputContext = React.createContext()
const outputContext = React.createContext()
const humanToCatContext = React.createContext()
const toggleHumanToCatContext = React.createContext()

export function useInput() {
  return useContext(inputContext)
}

export function useGetInput() {
  return useContext(getInputContext)
}

export function useOutput() {
  return useContext(outputContext)
}

export function useIsHumanToCat() {
  return useContext(humanToCatContext)
}

export function useToggleHumanToCat() {
  return useContext(toggleHumanToCatContext)
}

export const TranslatorContext = ({ children }) => {
  const [inputData, setInputData] = useState('')
  const [outputData, setOutputData] = useState('')
  const [humanToCat, setHumanToCat] = useState(true)

  useEffect(() => {
    inputData !== '' &&
      setOutputData(
        humanToCat
          ? translateHumanToCat(inputData)
          : translateCatToHuman(inputData)
      )
  }, [inputData])

  const toggleHumanToCat = () =>
    setHumanToCat(oldHumanToCat => {
      outputData !== '' && setInputData(outputData)
      return !oldHumanToCat
    })

  return (
    <inputContext.Provider value={setInputData}>
      <getInputContext.Provider value={inputData}>
        <outputContext.Provider value={outputData}>
          <humanToCatContext.Provider value={humanToCat}>
            <toggleHumanToCatContext.Provider value={toggleHumanToCat}>
              {children}
            </toggleHumanToCatContext.Provider>
          </humanToCatContext.Provider>
        </outputContext.Provider>
      </getInputContext.Provider>
    </inputContext.Provider>
  )
}
