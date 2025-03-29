import React, { useState, useEffect } from "react";
import LargeList from "./LargeList";
import "./App.css";

const App = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <h1>React.memo Optimization Example</h1>
      <p>Counter: {counter}</p>
      <LargeList />
    </div>
  );
};

export default App;
