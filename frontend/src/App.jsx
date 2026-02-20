import { useState, useEffect } from 'react'
import SubmitButton from './Components/SubmitButton'
import Leaderboard from './Components/Leaderboard.jsx'
import FpsGridShot from './Components/FpsGridshot.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>React App</h1>
      <Leaderboard></Leaderboard> */}
      <FpsGridShot></FpsGridShot>
    </>
  )
}

export default App
