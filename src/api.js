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
  return await res.json();
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
  return await res.json();
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
    credentials: 'include', 
    body: JSON.stringify({ name, time: score, date }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.msg || 'Score submission failed');
  }

  return await res.json();
}


export async function getHighScores() {
  const res = await fetch('/api/scores', {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Unable to load scores');
  }
  return await res.json();
}
