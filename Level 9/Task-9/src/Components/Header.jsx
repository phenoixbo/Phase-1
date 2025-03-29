import React from "react";
import { Link } from "react-router-dom";


const Header = React.memo(() => (
  <nav className="header">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/users">Users</Link>
  </nav>
));

export default Header;
