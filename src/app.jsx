import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Auth from './login/login';
import Play from './play/play';
import { Projects } from './projects/projects';
import { About } from './about/about';

export default function App() {
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
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main>
        <Routes>
  <Route path="/" element={<Auth onLogin={(email) => console.log("Logged in:", email)} />} />
  <Route path="/play" element={<Play />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/about" element={<About />} />
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
