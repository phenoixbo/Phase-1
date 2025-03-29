import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function DashBoard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li><Link to="overview">Overview</Link></li>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default DashBoard;
