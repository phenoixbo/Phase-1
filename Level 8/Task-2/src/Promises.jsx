import React, { useState } from "react";

import "./App.css";

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "  Pradeep" },
        { id: 2, name: "Rooban" },
      ]);
    }, 2000);
  });
};

const FetchDataPromise = () => {
  const [data, setData] = useState([]);

  const handleFetch = () => {
    fetchData().then((result) => {
      console.log("Promise Data:", result);
      setData(result);
    });
  };

  return (
    <div className="card">
      <h2>Promise</h2>
      <button className="btn" onClick={handleFetch}>Fetch Data (Promise)</button>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="list-item">{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDataPromise;
