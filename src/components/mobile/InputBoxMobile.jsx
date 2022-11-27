import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { darkText, whiteBackground, whiteText } from '../../Colors'
import {
  useGetInput,
  useInput,
  useIsHumanToCat,
  useTyping,
} from '../../context/TranslatorContext'
import { getSize } from '../../functions/Sizing'

export const InputBoxMobile = () => {
  const [value, setValue] = useState('')
  const [typing, setTyping] = useState(false)
  const getInput = useGetInput()
  const setInput = useInput()
  const humanToCat = useIsHumanToCat()

  const { setTyping: setThatTyping } = useTyping()

  useEffect(() => setValue(getInput), [humanToCat])

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
      <textarea
        placeholder='Type here!'
        value={value}
        style={{ ...box, fontSize: getSize(value, 1.7) }}
        onChange={updateValue}
      />
      <button
        className='growOnHover'
        style={{
          ...audioButton,
          opacity: value.length === 0 ? 0 : 1,
          visibility: value.length === 0 ? 'hidden' : 'visible',
        }}
        onClick={play}
      >
        <FontAwesomeIcon icon={faVolumeHigh} />
      </button>
      <div style={separator} />
    </div>
  )
}

const container = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  width: '100%',
}

const box = {
  width: 'calc(100% - 40px)',
  height: 'calc(150px + 0.6em)',
  padding: 'calc(20px - 0.3em) 20px', // Because of the font family I guess
  borderRadius: '15px 15px 0px 0px',

  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
  color: whiteText,
  fontWeight: '600',

  textDecoration: 'none',
  outline: 'none',
  border: 0,
  resize: 'none',
}

const audioButton = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  padding: 0,

  fontSize: '1.2em',
  fontWeight: '600',
  color: whiteText,
  backgroundColor: 'transparent',

  transition: 'visibility 0.5s, opacity 0.5s, scale 0.3s',
}

const separator = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '2px',
  background: 'rgba(255,255,254,0.5)',
  zIndex: 2,
}
