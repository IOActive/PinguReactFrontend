import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/home"} className="navbar-brand">
            Pingun Control Panel
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/bots"} className="nav-link">
                Bots
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
