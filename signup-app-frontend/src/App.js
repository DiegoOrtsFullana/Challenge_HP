import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';

function App() {
  // manage form inputs and app state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userCreated, setUserCreated] = useState(false);
  const [userID, setUserID] = useState(null);
  const [bio, setBio] = useState('');

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
        setUserID(data.id); // Store the ID of the created user
      } else {
        setMessage(data.message); 
      }
    } catch (error) {
      setMessage('Error al registrar el usuario'); 
    }
  };

  // Function to handle going back to the form
  const handleGoBack = () => {
    setUsername('');
    setPassword('');
    setMessage('');
    setUserCreated(false); // Go back to the user creation form
    setUserID(null); 
    setBio(''); 
  };

  // Page when user is created
  if (userCreated) {
    return (
      <div className="App">
        <h1>User successfully created</h1>
        <div className="user-info">
          <div className="user-box">
            <img src={logo} alt="User logo" className="logo" />
            <div className="user-details">
              <p>ID: {userID}</p> 
              <p>Username: {username}</p>
              <p>Password: {password}</p>
               {/* Bio structure added */}
              <label className="bio-text" htmlFor="bio">Bio:</label>
              <textarea   
                id="bio"
                className="bio-text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="5"
              />
            </div>
          </div>
        </div>
        <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  // Render sign-in form if user is not yet created
  return (
    <div className="App">
      <h1>Sign up</h1>
      <img src={logo} alt="User logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
