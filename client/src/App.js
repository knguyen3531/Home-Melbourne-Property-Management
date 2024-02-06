// client\src\App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        {/* More routes can be added here */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
