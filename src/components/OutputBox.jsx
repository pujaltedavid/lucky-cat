import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { darkText, whiteBackground, whiteText } from '../Colors'
import { useOutput, useWaitAlgorithm } from '../context/TranslatorContext'
import { getSize } from '../functions/Sizing'
import { listenMeows } from '../functions/Audio'

export const OutputBox = () => {
  const result = useOutput()
  const wait = useWaitAlgorithm()
  const [copyOpacity, setCopyOpacity] = useState(0)

  const play = () => {
    let text = new SpeechSynthesisUtterance()
    text.text = listenMeows(result)
    text.lang = 'ja'
    window.speechSynthesis.speak(text)
  }

  const copy = () => {
    setCopyOpacity(1)
    setTimeout(() => {
      setCopyOpacity(0)
    }, 2000)
    navigator.clipboard.writeText(result)
  }

  return (
    <div style={container}>
      <div
        style={{
          ...typeSign,
          opacity: !wait && result.length === 0 ? 1 : 0,
          visibility: !wait && result.length === 0 ? 'visible' : 'hidden',
        }}
      >
        TRANSLATION APPEARS HERE!
      </div>
      <div
        style={{
          ...typeSign,
          opacity: wait ? 1 : 0,
          visibility: wait ? 'visible' : 'hidden',
        }}
      >
        <div className='lds-ellipsis'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div
        style={{ ...box, fontSize: getSize(result) }}
        className='dark-selection'
      >
        <button
          className='growOnHover'
          style={{
            ...copyButton,
            opacity: wait || result.length === 0 ? 0 : 1,
            visibility: wait || result.length === 0 ? 'hidden' : 'visible',
          }}
          onClick={copy}
        >
          <div style={{ ...copyMessage, opacity: copyOpacity }}>Copied!</div>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <p
          style={{
            transition: 'opacity 0.5s, visibility 0.5s',
            margin: 0,
            opacity: wait || result.length === 0 ? 0 : 1,
            visibility: wait || result.length === 0 ? 'hidden' : 'visible',
          }}
        >
          {result}
        </p>
      </div>
      <button
        className='growOnHover'
        style={{
          ...translateButton,
          opacity: wait || result.length === 0 ? 0 : 1,
          visibility: wait || result.length === 0 ? 'hidden' : 'visible',
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
  overflowWrap: 'break-word',

  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
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
  transition: 'opacity 0.5s, visibility 0.5s',
  zIndex: 1,
}

const copyButton = {
  position: 'absolute',
  backgroundColor: 'transparent',
  padding: 0,
  fontSize: '1em',
  color: whiteBackground,
  bottom: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '10px',
  transition: 'opacity 0.5s, visibility 0.5s, scale 0.2s',
}

const copyMessage = {
  fontSize: '0.4em',
  transition: 'opacity 0.5s',
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
