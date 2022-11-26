import React from 'react'
import { useMobile } from '../context/UIContext'
import { HomeDesktop } from './HomeDesktop'
import { HomeMobile } from './mobile/HomeMobile'

export const Home = () => {
  const mobile = useMobile()
  return mobile ? <HomeMobile /> : <HomeDesktop />
}
