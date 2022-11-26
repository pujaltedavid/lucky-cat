import React from 'react'
import { useMobile } from '../context/UIContext'
import { HomeMobile } from './HomeMobile'
import { HomeDesktop } from './HomeDesktop'

export const Home = () => {
  const mobile = useMobile()
  return mobile ? <HomeMobile /> : <HomeDesktop />
}
