// import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Employees from './pages/Employees';
import Projects from './pages/Projects';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
