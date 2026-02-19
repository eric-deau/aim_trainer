import { useState, useEffect } from 'react'
import SubmitButton from './Components/SubmitButton'
import Leaderboard from './Components/Leaderboard.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   fetch("/api/leaderboard")
  //     .then(res => res.json())
  //     .then(data => console.log("Parsed:", data))
  //     .catch(err => console.error("Error:", err));
  // })

  return (
    <>
      <h1>React App</h1>
      <Leaderboard></Leaderboard>
      {/* <SubmitButton></SubmitButton> */}
    </>
  )
}

export default App
