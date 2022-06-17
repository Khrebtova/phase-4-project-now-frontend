// import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Clients from './pages/Clients';
import Employees from './pages/Employees';
import Projects from './pages/Projects';

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    document.title = 'Project Now';
    fetch('http://localhost:3001/me')
      .then((r) => {
        if (r.ok) {
          r.json()
          .then((user) => setUser(user))};
      });      
  }, []);

  // if (!user) return <SignUpForm onLogin={setUser}/>;

  return (
    <div className="App">
      <Router>
        <NavBar onLogout={setUser} user={user}/>
        
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/signup" element={<SignUpForm onLogin={setUser} user={user}/>} />
          <Route path="/login" element={<LoginForm onLogin={setUser} user={user}/>} />
          <Route path="/clients" element={<Clients />} user={user}/>
          <Route path="/employees" element={<Employees user={user}/>} />
          <Route path="/projects" element={<Projects user={user}/>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
