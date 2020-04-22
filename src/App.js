import React from 'react';
import './App.css';
import Stocks from './components/Stocks';
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="main">
    <Router>
    <div>
      <nav>
        <ul className='navbar'>
          <li>
            <Link to="/" className='navchild'>Home</Link>
          </li>
          <li>
            <Link to="/stocks" className='navchild'>Stocks</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/stocks">
          <Stocks />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  </div>
  );
}

export default App;
