import React, { useState } from 'react'
import { whiteText } from '../Colors'

export const HumanInput = () => {
  const [value, setValue] = useState('')

  return (
    <textarea
      value={value}
      style={box}
      onChange={e => setValue(e.target.value)}
    />
  )
}

const box = {
  width: '400px',
  height: '500px',
  padding: '20px',
  borderRadius: '15px',

  backgroundColor: 'rgba(0,0,0,0.3)',
  fontSize: '2em',
  color: whiteText,
  fontWeight: '600',

  textDecoration: 'none',
  outline: 'none',
  border: 0,
  resize: 'none',
}
