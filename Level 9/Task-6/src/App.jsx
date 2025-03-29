import React, { useState } from "react";
import PrimeCalculator from "./Calculator";
import "./App.css";

const App = () => {
  const [limit, setLimit] = useState(100);

  const handleInputChange = (event) => {
    setLimit(Number(event.target.value));
  };

  return (
    <div className="app-container">
      <h1>Prime Number Calculator</h1>
      <input
        type="number"
        value={limit}
        onChange={handleInputChange}
        className="input-field"
      />
      <PrimeCalculator limit={limit} />
    </div>
  );
};

export default App;
