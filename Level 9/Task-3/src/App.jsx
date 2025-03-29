import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './DashBoard';
import Overview from './OverView';
import Profile from './Profile';
import Settings from './Settings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Redirect from "/" to "/dashboard" */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="overview" element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
