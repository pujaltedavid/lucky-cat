import React from 'react'
import { darkText, whiteBackground, whiteText } from '../Colors'
import { useOutput } from '../context/TranslatorContext'

export const OutputBox = () => {
  const result = useOutput()

  const play = () => {
    let text = new SpeechSynthesisUtterance()
    text.text = result
    text.lang = 'ja'
    window.speechSynthesis.speak(text)
  }

  return (
    <div style={container}>
      <div
        style={{
          ...typeSign,
          opacity: result.length > 0 ? 0 : 1,
          visibility: result.length > 0 ? 'hidden' : 'visible',
        }}
      >
        TRANSLATION APPEARS HERE!
      </div>
      <div style={box}>{result}</div>
      <button
        className='growOnHover'
        style={{
          ...translateButton,
          visibility: result.length > 0 ? 'visible' : 'hidden',
          opacity: result.length > 0 ? 1 : 0,
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
  alignItems: 'flex-end',
  gap: '20px',
}

const box = {
  width: '300px',
  height: '300px',
  padding: '20px',
  borderRadius: '15px',
  overflowY: 'auto',

  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
  fontSize: '1.2em',
  color: whiteBackground,
  fontWeight: '600',

  textDecoration: 'none',
  outline: 'none',
  border: 0,
}

const typeSign = {
  position: 'absolute',
  width: '340px',
  height: '340px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  fontSize: '1.5em',
  fontWeight: '600',
  color: whiteBackground,
  transition: 'opacity 0.5s',
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
