import { hot } from 'react-hot-loader/root';
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'Routes';

const App = () => {
  return (
    <div className="main">
      <Router>
        <Routes />
      </Router>
    </div>
  );
};

export default hot(App);
