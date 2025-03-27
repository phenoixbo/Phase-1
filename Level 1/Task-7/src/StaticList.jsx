import React from "react";
import './App.css';

const StaticList = () => {
  return (
    <div className="list">
      <h3 className="heading">My Favorite Fruits</h3>
      <ul>
        <li>Apple</li>
        <li>Banana</li>
        <li>Orange</li>
        <li>Mango</li>
        <li>Grapes</li>
      </ul>
    </div>
  );
};

export default StaticList;
