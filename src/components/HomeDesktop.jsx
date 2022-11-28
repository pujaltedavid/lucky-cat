import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { darkText, gold, whiteBackground } from '../Colors'
import {
  useIsHumanToCat,
  useToggleHumanToCat,
} from '../context/TranslatorContext'
import { Cat } from './Cat'
import { ChangeLanguage } from './ChangeLanguage'
import { Footer } from './Footer'
import { InputBox } from './InputBox'
import { OutputBox } from './OutputBox'

export const HomeDesktop = () => {
  const humanToCat = useIsHumanToCat()
  const toggleHumanToCat = useToggleHumanToCat()

  return (
    <div style={container}>
      <div style={header}>
        <div
          style={{
            ...headerTitleContainer,
            transform: `translateX(${humanToCat ? 0 : 'calc(1030px - 8.5em)'})`,
          }}
        >
          <h1 style={headerTitle}>HUMAN</h1>
        </div>
        <button
          className='growOnHover'
          style={buttonStyle}
          onClick={toggleHumanToCat}
        >
          <FontAwesomeIcon
            icon={faArrowRightArrowLeft}
            style={arrowIconStyle}
          />
        </button>
        <div
          style={{
            ...headerTitleContainer,
            paddingLeft: '2em', //'4.2em', 4.2 is centered but not relative to cat
            transform: `translateX(${
              humanToCat ? 0 : 'calc(-1030px + 4.5em)'
            })`,
          }}
        >
          <h1 style={{ ...headerTitle, color: gold }}>CAT</h1>
        </div>
      </div>
      <div style={row}>
        <InputBox />
        <Cat width='250px' />
        <OutputBox />
      </div>
      <ChangeLanguage />
      <Footer />
    </div>
  )
}

const container = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '70px 30px 0px',
  minHeight: '100vh',
}

const header = {
  width: '1030px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  userSelect: 'none',
}

const headerTitleContainer = {
  transition: 'transform 1s cubic-bezier(.09,.32,.05,.96)',
}

const headerTitle = {
  color: darkText,
  margin: 0,
}

const buttonStyle = {
  background: whiteBackground,
  color: darkText,
  width: 'fit-content',
  padding: '15px 50px',
  borderRadius: '15px',
}

const arrowIconStyle = {
  fontSize: '1.5em',
}

const row = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '50px',
  marginBottom: '70px',
  flex: 1,
}
