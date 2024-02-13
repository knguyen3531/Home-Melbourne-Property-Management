import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage'; // Make sure to import the ProfilePage component
import LoginForm from './components/auth/LoginForm';
import Nav from './components/common/Nav';

function App() {
    return (
        <Router>
            <AuthProvider> {/* Ensures AuthContext wraps the entire app */}
                <div className="App">
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginForm} />
                        <ProtectedRoute path="/dashboard" component={DashboardPage} />
                        <ProtectedRoute path="/profile" component={ProfilePage} /> {/* ProtectedRoute for Profile */}
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
