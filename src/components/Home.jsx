import React from 'react'
import { Cat } from './Cat'
import { HumanInput } from './HumanInput'

export const Home = () => {
  return (
    <div style={container}>
      <HumanInput />
      <Cat />
    </div>
  )
}

const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
