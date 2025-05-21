import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PageHeader from './components/PageHeader/PageHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PageHeader/>
    </>
  )
}

export default App
