import React, { useEffect, useState } from 'react'
import '../App.css'
import { useMobile } from '../context/UIContext'

//let line = '幸運 願い事 金 偉大さ 良い 猫 優勢 町 明るい 翻訳'
let line = '幸運願い事金偉大さ良い猫優勢町明るい翻訳'
line += line

export const Background = () => {
  const mobile = useMobile()

  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1)
    }, 250)
  }, [])

  return (
    <>
      <div style={backgroundStyle}></div>
      <div
        style={{ ...textContainer, translate: mobile ? '-50%' : '-50% -31%' }}
      >
        {[...Array(30).keys()].map(el => {
          const n = Math.floor(Math.random() * line.length + 1)
          return (
            <p
              key={el}
              className='scrollingWords'
              style={{
                opacity: opacity,
              }}
            >
              {line.slice(n) + line.slice(0, n)}
            </p>
          )
        })}
      </div>
    </>
  )
}

const backgroundStyle = {
  backgroundColor: '#FBAB7E',
  backgroundImage: 'linear-gradient(62deg, #FF416C 0%, #FF4B2B 100%)',
  position: 'fixed',
  inset: -500,
  zIndex: -1,
}

const textContainer = {
  position: 'fixed',
  color: 'rgba(0,0,0,0.1)',
  fontSize: '70px',
  fontWeight: '500',
  writingMode: 'vertical-rl',
  textOrientation: 'upright',
  userSelect: 'none',
  fontFamily: 'ヒラギノ角ゴ Pro W3',
  whiteSpace: 'nowrap',
  rotate: '45deg',
  zIndex: -1,
}
