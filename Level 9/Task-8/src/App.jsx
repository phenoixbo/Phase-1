import React from "react";
import VirtualList from "./VirtualList.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>Listing</h1>
      <VirtualList itemCount={10000} />
    </div>
  );
};

export default App;
