// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PropertiesPage from './pages/PropertiesPage';
import TenantsPage from './pages/TenantsPage';
import MaintenancePage from './pages/MaintenancePage';
import Login from './components/auth/Login'; // Import the Login component
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import './app.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/properties" component={PropertiesPage} />
        <Route path="/tenants" component={TenantsPage} />
        <Route path="/maintenance" component={MaintenancePage} />
        <Route path="/login" component={Login} /> {/* Add this line for the login route */}
        {/* Add more routes as needed */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
