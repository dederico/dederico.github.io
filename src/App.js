import React, { useState } from 'react';
// import Landing from './components/Landing'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Routes from './Routes'
// Components
import NavbarComponent from './components/NavbarComponent'
// Styles
import './App.css';

function App() {
  const [shows, setShows] = useState([])
  return (
    <>
      <Router>
        <NavbarComponent setShows={setShows} />
        <Switch>
          <main className="container mt-4">
            <Routes shows={shows} />
          </main>

        </Switch>
      </Router>


    </>
  );
}

export default App;
