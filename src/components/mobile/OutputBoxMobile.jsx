import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { whiteText, whiteTextDisabled, gold } from '../../Colors'
import {
  useOutput,
  useWaitAlgorithm,
  useIsHumanToCat,
} from '../../context/TranslatorContext'
import { getSize } from '../../functions/Sizing'
import { listenMeows, play } from '../../functions/Audio'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

export const OutputBoxMobile = () => {
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
        style={{ ...box, fontSize: getSize(result, 1.7) }}
        className='dark-selection'
      >
        <p
          style={{
            transition: `opacity 0.5s, visibility 0.5s${
              result.length > 12 ? '' : ', color 0.5s'
            }`,
            color: result ? (humanToCat ? gold : whiteText) : whiteTextDisabled,
            margin: '0 0 50px 0',
            opacity: wait ? 0 : 1,
            visibility: wait ? 'hidden' : 'visible',
          }}
        >
          {result ? result : 'Translation appears here!'}
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
          ...audioButton,
          opacity: wait || result.length === 0 ? 0 : 1,
          visibility: wait || result.length === 0 ? 'hidden' : 'visible',
          color: humanToCat ? gold : whiteText,
        }}
        onClick={() => play(humanToCat ? listenMeows(result) : result)}
      >
        <FontAwesomeIcon icon={faVolumeHigh} />
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
  width: '100%',
}

const box = {
  width: 'calc(100% - 40px)',
  height: 'calc(150px + 0.6em)',
  padding: 'calc(20px - 0.3em) 20px', // Because of the font family I guess
  borderRadius: '0px 0px 15px 15px',
  overflowY: 'auto',
  overflowWrap: 'break-word',

  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
  fontWeight: '600',

  textDecoration: 'none',
  outline: 'none',
  border: 0,
}

const typeSign = {
  position: 'absolute',
  width: '340px',
  height: '150px',
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
  bottom: '20px',
  left: '20px',
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
