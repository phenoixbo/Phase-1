import React, { useState } from "react";
import "./App.css";

const fetchData = (callback) => {
  setTimeout(() => {
    const mockData = [
      { id: 1, name: "Pradeep" },
      { id: 2, name: "Rooban" },
    ];
    callback(mockData);
  }, 2000);
};

const FetchDataCallback = () => {
  const [data, setData] = useState([]);

  const handleData = (data) => {
    setData(data);
  };

  return (
    <div className="card">
      <h2>Callback Example</h2>
      <button className="btn" onClick={() => fetchData(handleData)}>
        Fetch Data (Callback)
      </button>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="list-item">{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDataCallback;
