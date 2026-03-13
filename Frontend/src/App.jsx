import { useState } from 'react'
import me from './me.jpg'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const handleChange = (event)=>{
    setMessage(event.target.value)
  }
  const sendMessage = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("http://localhost:3000/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ prompt: message }),
      })

      const data = await response.json();
      setResult(data.response)
    } catch (error) {
      setResult({ error: "Failed to fetch workout. Check the backend." })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div>
        <h1><a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=76C0C5&width=435&lines=Working+Out+is+a+Lifestyle!" alt="Typing SVG" /></a></h1>
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
            <textarea
              value={message}
              onChange={(event) => handleChange(event)}
              rows="3"
              cols="40"
              placeholder="e.g. 4-day push/pull split, dumbbells only"
            />
            <button onClick={() => sendMessage()} disabled={isLoading}>
              {isLoading ? 'Generating…' : 'Submit!'}
            </button>
          </div>

          {result && (
            <div className="result-box">
              <h3>Your Workout</h3>
              <pre>{typeof result === 'string' ? result : JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {currentPage === 'about' && (
        <div>
          <h1>About Us</h1>
          <img src={me} className="about-photo" alt="Workout" />
          <p>
            This workout generator builds custom workouts that actually fit you—your goals,
            your schedule, and your gear. No more random routines or wasted time: every
            workout is designed to push you, progress you, and keep things fresh. Whether
            you’re chasing muscle, fat loss, or pure consistency, this generator turns
            “I should work out” into “let’s go.” 🔥
          </p>
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
