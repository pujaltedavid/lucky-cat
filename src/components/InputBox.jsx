import React, { useEffect, useRef, useState } from 'react'
import { darkText, whiteBackground, whiteText } from '../Colors'
import { useGetInput, useInput, useTyping } from '../context/TranslatorContext'
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
  const [typing, setTyping] = useState(false)
  const getInput = useGetInput()
  const setInput = useInput()

  const { setTyping: setThatTyping } = useTyping()

  useEffect(() => setValue(getInput), [getInput])

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setTyping(false)
      setThatTyping(false)
    }, 1000)

    if (!typing) setInput(value)

    return () => clearTimeout(typingTimeout)
  }, [typing])

  const play = () => {
    let text = new SpeechSynthesisUtterance()
    text.text = value
    text.lang = 'ja'
    window.speechSynthesis.speak(text)
  }

  const updateValue = e => {
    if (e.target.value[e.target.value.length - 1] !== '\n') {
      setValue(e.target.value)
      setTyping(true)
      setThatTyping(true)
    }
  }

  return (
    <div style={container}>
      <div
        style={{
          ...typeSign,
          opacity: value.length > 0 ? 0 : 1,
          visibility: value.length > 0 ? 'hidden' : 'visible',
        }}
        onClick={setInputFocus}
      >
        TYPE HERE!
      </div>
      <textarea
        ref={inputRef}
        value={value}
        style={{ ...box, fontSize: getSize(value) }}
        onChange={updateValue}
      />
      <button
        className='growOnHover'
        style={{
          ...translateButton,
          opacity: value.length === 0 ? 0 : 1,
          visibility: value.length === 0 ? 'hidden' : 'visible',
        }}
        onClick={play}
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
  height: '300px',
  padding: '20px',
  borderRadius: '15px',

  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
  color: whiteBackground,
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
  color: whiteBackground,
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
