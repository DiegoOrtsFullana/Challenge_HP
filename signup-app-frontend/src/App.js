import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 

function App() {
  // New states to store the user information
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [userCreated, setUserCreated] = useState(false); 

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.status === 201) {
        setUserCreated(true); // Indicate that the user has been created
        setUserId(data.id); // Store the ID of the created user
      }
      setMessage(data.message);
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  // Function to handle going back to the form
  const handleGoBack = () => {
    setUsername('');
    setPassword('');
    setMessage('');
    setUserCreated(false); // Go back to the user creation form
    setUserId(null); // Clear the ID of the created user
  };

  // Page when user is created
  if (userCreated) {
    return (
      <div className="App">
        <div className="user-box">
          <h1>User Created</h1>
          <p>ID: {userId}</p>
          <p>Username: {username}</p>
          <p>Password: {password}</p>
          <button onClick={handleGoBack}>Go Back</button> 
        </div>
      </div>
    );
  }

  // Render sign-in form if user is not yet created
  return (
    <div className="App">
      <h1>Sign in</h1>
      <img src={logo} alt="User logo" className="logo" /> 
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update the state of the username
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update the state of the password
        />
        <button type="submit">Sign Up</button> 
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
}

export default App;
