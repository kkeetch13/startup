import React, { useState } from 'react';
import { registerUser, loginUser } from '../api.js';

export default function Auth({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAction = async () => {
    try {
      const user = isRegistering
        ? await registerUser(email, password)
        : await loginUser(email, password);
      onLogin(user.email);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginBottom: '0.5rem', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginBottom: '0.5rem', width: '100%' }}
      />
      <button onClick={handleAction} style={{ marginRight: '0.5rem' }}>
        {isRegistering ? 'Register' : 'Login'}
      </button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        Switch to {isRegistering ? 'Login' : 'Register'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export function Login() {
  return (
    <main>
      <img src="/familyphoto.jpeg" alt="Family Photo" />
      <div className="elevator-pitch">
        <p>
          Hi, I'm Kaden Keetch, a computer science and political science double major
          passionate about turning ideas into functional and engaging digital experiences.
          My work showcases my skills in programming, web-development, and crafting
          user-friendly solutions.
        </p>
        <p>
          Click around to see some of my interests, projects, and even my resume.
        </p>
      </div>
    </main>
  );
}
