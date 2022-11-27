import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
  darkText,
  gold,
  redBackground,
  whiteBackground,
  whiteText,
} from '../../Colors'
import {
  useIsHumanToCat,
  useToggleHumanToCat,
} from '../../context/TranslatorContext'
import { Cat } from '../Cat'
import { Footer } from '../Footer'
import { InputBoxMobile } from './InputBoxMobile'
import { OutputBoxMobile } from './OutputBoxMobile'

export const HomeMobile = () => {
  const humanToCat = useIsHumanToCat()
  const toggleHumanToCat = useToggleHumanToCat()

  return (
    <div style={container}>
      <Cat width='50px' style={{ marginTop: '-30px', marginBottom: '30px' }} />
      <div style={header}>
        <div style={sliderContainer}>
          <div style={{ ...sliderGrower, flexGrow: humanToCat ? 0 : 1 }} />
          <div
            style={{
              ...headerTitleContainer,
              //transform: `translateX(${humanToCat ? 0 : 0})`, //'calc(1030px - 8.5em)'})`,
              flexGrow: 0,
            }}
          >
            <h1 style={headerTitle}>HUMAN</h1>
          </div>
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
        <div style={sliderContainer}>
          <div style={{ ...sliderGrower, flexGrow: humanToCat ? 1 : 0 }} />

          <div
            style={{
              ...headerTitleContainer,
              //transform: `translateX(${humanToCat ? 0 : 'calc(-100%)'})`,
              flexGrow: 0,
            }}
          >
            <h1 style={{ ...headerTitle, color: gold }}>CAT</h1>
          </div>
        </div>
      </div>
      <div style={inputOutput}>
        <InputBoxMobile />
        <OutputBoxMobile />
      </div>
      <Footer />
    </div>
  )
}

const container = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '70px 0px 0px',
  gap: '10px',
}

const header = {
  position: 'relative',
  width: 'calc(100% - 40px)',
  height: 'calc(1.2em + 20px)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  userSelect: 'none',
}

const sliderContainer = {
  position: 'absolute',
  display: 'flex',
  flexFlow: 'row nowrap',
  width: '100%',
}

const sliderGrower = {
  position: 'relative',
  transition: 'all 0.5s cubic-bezier(.08,.44,.47,.95)',
}

const headerTitleContainer = {
  position: 'relative',
  backgroundColor: redBackground,
  color: whiteText,
  padding: '5px 10px',
  borderRadius: '8px',
  width: '6em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const headerTitle = {
  margin: 0,
  fontSize: '1.2em',
}

const buttonStyle = {
  position: 'absolute',
  left: 'calc(50% - 15px - 0.5em)',
  background: whiteBackground,
  color: darkText,
  padding: '5px 15px',
  borderRadius: '8px',
  zIndex: 1,
}

const arrowIconStyle = {}

const inputOutput = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0px',
  marginBottom: '150px',
  flex: 1,
}

const row = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '50px',
}
