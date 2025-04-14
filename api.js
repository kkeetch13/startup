export async function registerUser(email, password) {
    const res = await fetch('/api/auth/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.msg || 'Registration failed');
    }
    return res.json();
  }
  
  export async function loginUser(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.msg || 'Login failed');
    }
    return res.json();
  }
  
  export async function logoutUser() {
    const res = await fetch('/api/auth/logout', {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Logout failed');
    }
  }
  
  export async function submitScore(name, score, date) {
    const res = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score, date }),
    });
    if (!res.ok) {
      throw new Error('Score submission failed');
    }
    return res.json();
  }
  
  export async function getHighScores() {
    const res = await fetch('/api/scores');
    if (!res.ok) {
      throw new Error('Unable to load scores');
    }
    return res.json();
  }
  