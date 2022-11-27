import React, { useEffect, useRef, useState } from 'react'
import {
  darkText,
  gold,
  redBackground,
  whiteBackground,
  whiteText,
} from '../Colors'
import {
  useGetInput,
  useInput,
  useIsHumanToCat,
} from '../context/TranslatorContext'
import { play } from '../functions/Audio'
import { getSize } from '../functions/Sizing'

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus()
  }

  return [htmlElRef, setFocus]
}

export const InputBox = () => {
  const [value, setValue] = useState('')
  const [inputRef, setInputFocus] = useFocus()
  // const [typing, setTyping] = useState(false)
  const getInput = useGetInput()
  const setInput = useInput()
  const humanToCat = useIsHumanToCat()

  // const { setTyping: setThatTyping } = useTyping()

  useEffect(() => setValue(getInput), [humanToCat])

  /* old typing state
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setTyping(false)
      setThatTyping(false)
    }, 1000)

    if (!typing) setInput(value)

    return () => clearTimeout(typingTimeout)
  }, [typing])
  */

  const updateValue = e => {
    if (e.target.value[e.target.value.length - 1] !== '\n') {
      setValue(e.target.value)
      setInput(e.target.value)
      //setTyping(true)
      //setThatTyping(true)
    }
  }

  return (
    <div style={container}>
      <div
        style={{
          ...typeSign,
          opacity: value.length > 0 ? 0 : 1,
          visibility: value.length > 0 ? 'hidden' : 'visible',
          color: humanToCat ? whiteText : gold,
        }}
        onClick={setInputFocus}
      >
        TYPE HERE!
      </div>
      <textarea
        ref={inputRef}
        value={value}
        style={{
          ...box,
          fontSize: getSize(value),
          color: humanToCat ? whiteText : gold,
        }}
        onChange={updateValue}
      />
      <button
        className='growOnHover'
        style={{
          ...translateButton,
          opacity: value.length === 0 ? 0 : 1,
          visibility: value.length === 0 ? 'hidden' : 'visible',
          backgroundColor: humanToCat ? whiteText : gold,
          color: humanToCat ? darkText : redBackground,
        }}
        onClick={() => play(value)}
      >
        LISTEN!
      </button>
    </div>
  )
}

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
}

const box = {
  width: '300px',
  height: 'calc(300px + 0.6em)',
  padding: 'calc(20px - 0.3em) 20px', // Because of the font family I guess
  borderRadius: '15px',

  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
  color: whiteText,
  fontWeight: '600',

  textDecoration: 'none',
  outline: 'none',
  border: 0,
  resize: 'none',
}

const typeSign = {
  position: 'absolute',
  width: '340px',
  height: '340px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5em',
  fontWeight: '600',
  color: whiteText,
  transition: 'opacity 0.5s',
  userSelect: 'none',
  zIndex: 1,
}

const translateButton = {
  fontSize: '1.2em',
  fontWeight: '600',
  background: whiteBackground,
  color: darkText,
  borderRadius: '15px',
  padding: '20px 25px',
  width: 'fit-content',

  transition: 'visibility 0.5s, opacity 0.5s, scale 0.3s',
}
