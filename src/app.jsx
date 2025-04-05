import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Projects } from './projects/projects';
import { About } from './about/about';

export default function App() {
    return (
        <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
            <div className="navbar-brand">
              Kaden Keetch
            </div>
            <menu className="navbar-nav">
              <li className="nav-item">
              <NavLink className="nav-link" to="">Login</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="play">Play</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="projects">Projects</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="about">About</NavLink>
              </li>
            </menu>
          </nav>
        </header>
  
        <main><Routes>
        <Route path="/" element={<Login />} />
        <Route path="/play" element={<Play />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes></main>
  
        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Kaden Keetch</span>
            <a className="text-reset" href="https://github.com/kkeetch13/startup.git">
              Source
            </a>
          </div>
        </footer>
      </div>
      </BrowserRouter>
    );
  }

  function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }