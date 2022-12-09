import './App.css'
import { Background } from './components/Background'
import { Home } from './components/Home'
import { AppContext } from './context/AppContext'

function App() {
  return (
    <AppContext>
      <Background />
      <Home />
    </AppContext>
  )
}

export default App