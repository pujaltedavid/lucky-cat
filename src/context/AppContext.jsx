import React from 'react'
import { TranslatorContext } from './TranslatorContext'
import { UIContext } from './UIContext'

export const AppContext = ({ children }) => {
  return (
    <TranslatorContext>
      <UIContext>{children}</UIContext>
    </TranslatorContext>
  )
}
