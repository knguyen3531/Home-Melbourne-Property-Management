// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginForm from './components/auth/LoginForm';
import Nav from './components/common/Nav';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginForm} />
                        <ProtectedRoute path="/dashboard" component={DashboardPage} />
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
