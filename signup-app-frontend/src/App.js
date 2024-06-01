import React, { useState } from 'react';
import './App.css';

function App() {
  // Define states 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userCreated, setUserCreated] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      // Send form data to the backend
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Convert data to JSON format
      });
      // Backend response
      const data = await response.json();
      if (response.status === 201) {
        setUserCreated(true); // User has been successfully created
      }
      setMessage(data.message); // Message received from backend
    } catch (error) {
      setMessage('Error registering user'); // Handle error
    }
  };

  // Web if user has been succesfully created
  if (userCreated) {
    return (
      <div className="App">
        <h1>User Created</h1>
        <p>Username: {username}</p>
        <p>Password: {password}</p>
      </div>
    );
  }

  // Render user signup form
  return (
    <div className="App">
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Username input field */}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
        />
        {/* Password input field */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        
        <button type="submit">Sign Up</button>
      </form>
     
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

