import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { gold, whiteText } from '../../Colors'
import {
  useGetInput,
  useInput,
  useIsHumanToCat,
} from '../../context/TranslatorContext'
import { listenMeows, play } from '../../functions/Audio'
import { getSize } from '../../functions/Sizing'

export const InputBoxMobile = () => {
  const [value, setValue] = useState('')
  // const [typing, setTyping] = useState(false) old typing state
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
      //setTyping(true) old typing state
      //setThatTyping(true)
    }
  }

  return (
    <div style={container}>
      <textarea
        placeholder='Type here!'
        value={value}
        style={{
          ...box,
          fontSize: getSize(value, 1.7),
          color: humanToCat ? whiteText : gold,
        }}
        onChange={updateValue}
      />
      <button
        className='growOnHover'
        style={{
          ...audioButton,
          opacity: value.length === 0 ? 0 : 1,
          visibility: value.length === 0 ? 'hidden' : 'visible',
          color: humanToCat ? whiteText : gold,
        }}
        onClick={() => play(humanToCat ? value : listenMeows(value))}
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
