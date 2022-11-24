import React from 'react'
import '../App.css'

//let line = '幸運 願い事 金 偉大さ 良い 猫 優勢 町 明るい 翻訳'
let line = '幸運願い事金偉大さ良い猫優勢町明るい翻訳'
line += line

export const Background = () => {
  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={textContainer}>
        {[...Array(14).keys()].map(el => (
          <p key={el} className='scrollingWords'>
            {line}
          </p>
        ))}
      </div>
    </>
  )
}

const backgroundStyle = {
  backgroundColor: '#FBAB7E',
  backgroundImage: 'linear-gradient(62deg, #FF416C 0%, #FF4B2B 100%)',
  position: 'fixed',
  inset: 0,
  zIndex: -1,
}

const textContainer = {
  position: 'fixed',
  color: 'rgba(0,0,0,0.3)',
  fontSize: '80px',
  fontWeight: '500',
  writingMode: 'vertical-rl',
  textOrientation: 'upright',
  userSelect: 'none',
  fontFamily: 'ヒラギノ角ゴ Pro W3',
  whiteSpace: 'nowrap',
  rotate: '45deg',
  translate: '-50% -31%',
}
