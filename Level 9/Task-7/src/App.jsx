import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemList from "./ItemList";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1>E-Commerce</h1>
        <Routes>
          <Route path="/" element={<ItemList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
