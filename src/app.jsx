import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Auth from './login/login';
import Play from './play/play';
import { Projects } from './projects/projects';
import About from './about/about';
import Scores from './scores/scores';
import { logoutUser } from './api.js';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="py-3">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <div className="navbar-brand h1 mb-0">Kaden Keetch</div>
              <nav>
                <ul className="nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/play">Play</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/projects">Projects</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/scores">Scores</NavLink>
                  </li>
                  {user && (
                    <li className="nav-item">
                      <button className="nav-link btn btn-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={user ? <Play userName={user.email} /> : <Auth onLogin={setUser} />} />
            <Route path="/play" element={<Play userName={user ? user.email : "Anonymous"} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="*" element={<h2 className="text-center py-5">404: Page not found</h2>} />
          </Routes>
        </main>

        <footer className="bg-dark text-white-50 py-3">
          <div className="container-fluid text-center">
            <span className="text-reset">Kaden Keetch</span>
            <a className="text-reset ms-2" href="https://github.com/kkeetch13/startup.git">
              Source
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
