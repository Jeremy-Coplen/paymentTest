import React, { Component } from 'react';
import { HashRouter as Router } from "react-router-dom"
import './App.css';

import routes from "./routes"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            {routes}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
