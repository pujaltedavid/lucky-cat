import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import {
  darkText,
  gold,
  redBackground,
  whiteBackground,
  whiteText,
} from '../Colors'
import {
  useIsHumanToCat,
  useOutput,
  useWaitAlgorithm,
} from '../context/TranslatorContext'
import { getSize } from '../functions/Sizing'
import { listenMeows, play } from '../functions/Audio'

export const OutputBox = () => {
  const result = useOutput()
  const wait = useWaitAlgorithm()
  const [copyOpacity, setCopyOpacity] = useState(0)
  const humanToCat = useIsHumanToCat()

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
          color: humanToCat ? gold : whiteText,
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
        <p
          style={{
            transition: 'opacity 0.5s, visibility 0.5s',
            margin: '0 0 60px 0',
            opacity: wait || result.length === 0 ? 0 : 1,
            visibility: wait || result.length === 0 ? 'hidden' : 'visible',
            color: humanToCat ? gold : whiteText,
          }}
        >
          {result}
        </p>
      </div>
      <button
        className='growOnHover'
        style={{
          ...copyButton,
          opacity: wait || result.length === 0 ? 0 : 1,
          visibility: wait || result.length === 0 ? 'hidden' : 'visible',
          color: humanToCat ? gold : whiteText,
        }}
        onClick={copy}
      >
        <div style={{ ...copyMessage, opacity: copyOpacity }}>Copied!</div>
        <FontAwesomeIcon icon={faCopy} />
      </button>
      <button
        className='growOnHover'
        style={{
          ...translateButton,
          opacity: wait || result.length === 0 ? 0 : 1,
          visibility: wait || result.length === 0 ? 'hidden' : 'visible',
          backgroundColor: humanToCat ? gold : whiteText,
          color: humanToCat ? redBackground : darkText,
        }}
        onClick={() => play(humanToCat ? listenMeows(result) : result)}
      >
        LISTEN!
      </button>
    </div>
  )
}
const container = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '20px',
}

const box = {
  width: '300px',
  height: 'calc(300px + 0.6em)',
  padding: 'calc(20px - 0.3em) 20px', // Because of the font family I guess
  borderRadius: '15px',
  overflowY: 'auto',
  overflowWrap: 'break-word',

  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
  color: whiteText,
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
  color: whiteText,
  transition: 'opacity 0.5s, visibility 0.5s',
  zIndex: 1,
}

const copyButton = {
  position: 'absolute',
  left: '20px',
  bottom: 'calc(40px + 1.2em + 20px + 20px)',
  backgroundColor: 'transparent',
  padding: 0,
  fontSize: '1.4em',
  color: whiteText,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '5px',
  transition: 'opacity 0.5s, visibility 0.5s, scale 0.2s',
}

const copyMessage = {
  fontSize: '0.4em',
  transition: 'opacity 0.5s',
  fontWeight: '600',
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
