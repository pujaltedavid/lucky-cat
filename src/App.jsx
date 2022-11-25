import './App.css'
import { Background } from './components/Background'
import { Home } from './components/Home'
import { TranslatorContext } from './context/TranslatorContext'

function App() {
  return (
    <TranslatorContext>
      <Background />
      <Home />
    </TranslatorContext>
  )
}

export default App
