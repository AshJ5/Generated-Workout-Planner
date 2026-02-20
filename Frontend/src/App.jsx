import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import me from './me.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')
  const [currentPage, setCurrentPage] = useState('home')

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
      <div>
        <h1>Working Out is a Lifestyle!</h1>
        </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'active' : ''}>Home</a></li>
          <li><a onClick={() => setCurrentPage('about')} className={currentPage === 'about' ? 'active' : ''}>About</a></li>
          <li><a onClick={() => setCurrentPage('contact')} className={currentPage === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>
      </nav>

      {currentPage === 'home' && (
        <div className="home-page">
          <h2>Enter your workout details:</h2>
          <div className="form-container">
            <textarea onChange={(event)=>{handleChange(event)}} rows="2" cols="30"></textarea>
            <button onClick={()=>{sendMessage()}}> Submit! </button>
          </div>
        </div>
      )}

      {currentPage === 'about' && (
        <div>
          <h1>About Us</h1>
          <img src = {me} className="about-photo" alt="Workout" />
          <p>This workout generator builds custom workouts that actually fit you—your goals, your schedule, and your gear. No more random routines or wasted time: every workout is designed to push you, progress you, and keep things fresh. Whether you’re chasing muscle, fat loss, or pure consistency, this generator turns “I should work out” into “let’s go.” 🔥</p>
        </div>
      )}

      {currentPage === 'contact' && (
        <div>
          <h1>Contact Us</h1>
          <p>Email: support@workoutplanner.com</p>
          <p>Phone: 1(800)373-2563 </p>
          <p>Address: Somewhere between a rock and a hard place!</p>
          <p>Social Media: @workoutplanner on all platforms</p>
        </div>
      )}
    </div>
  )
}

export default App
