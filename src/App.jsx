import { useState } from 'react'
import './App.css'
import PRAnalyzerPage from './pages/PRAnalyzePage/PRAnalyzePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PRAnalyzerPage/>
        
    </>
  )
}

export default App
