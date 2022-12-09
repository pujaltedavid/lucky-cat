import React from 'react'
import { gold } from '../Colors'

export const Footer = () => {
  return (
    <div style={container}>
      <a href='https://github.com/pujaltedavid/lucky-cat'>
        <p>
          Sometimes you want to be a cat but you don't know how to express
          yourself.
        </p>
      </a>
    </div>
  )
}

const container = {
  marginTop: '50px',
  backgroundColor: 'rgba(0,0,0,0.3)',
  width: 'calc(100vw - 50px)',
  padding: '10px 25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: gold,
  fontWeight: 600,
  backdropFilter: 'blur(10px)',
  textAlign: 'center',
}
