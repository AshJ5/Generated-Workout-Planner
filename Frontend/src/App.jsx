import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  const handleChange = (event)=>{
    setMessage(event.target.value)
  }
  const sendMessage = async ()=>{
    let response = await fetch("http://localhost:3000/workout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json"
        },
        body: JSON.stringify({"message": message})
        
      }
    )

    let data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <h1>Hello World</h1>
      <input onChange={(event)=>{handleChange(event)}}  type="textarea" />
      <button onClick={()=>{sendMessage()}}> Click </button>
    </div>
  )
}

export default App
