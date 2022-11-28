import React, { useState } from 'react'
import { redBackground, whiteText } from '../Colors'
import { useLanguage } from '../context/TranslatorContext'

const languages = { es: 'Spanish', ca: 'Catalan', en: 'English' }

export const ChangeLanguage = () => {
  const { currentLanguage, changeLanguage } = useLanguage()
  const [openMenu, setOpenMenu] = useState(false)

  const click = lang => {
    setOpenMenu(false)
    changeLanguage(lang)
  }

  return (
    <div style={container}>
      <p style={{ margin: 0 }}>
        I assume you speak {languages[currentLanguage]}
      </p>
      {openMenu ? (
        <div style={box}>
          {Object.keys(languages)
            .filter(k => k !== currentLanguage)
            .map(lang => (
              <button
                style={languageButton}
                onClick={() => click(lang)}
                key={lang}
                className='growOnHover'
              >
                {languages[lang]}
              </button>
            ))}
        </div>
      ) : (
        <button
          style={changeButton}
          className='growOnHover'
          onClick={() => setOpenMenu(true)}
        >
          CHANGE
        </button>
      )}
    </div>
  )
}

const container = {
  color: whiteText,
  fontWeight: 600,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  height: '150px',
}

const changeButton = {
  borderRadius: '10px',
  backgroundColor: redBackground,
  padding: '10px 15px',
  color: whiteText,
  fontWeight: '600',
}

const box = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: redBackground,
  borderRadius: '10px',
  padding: '15px 30px',
  gap: '10px',
}

const languageButton = {
  color: whiteText,
  backgroundColor: 'transparent',
  fontWeight: '600',
  fontSize: '1.2em',
}
