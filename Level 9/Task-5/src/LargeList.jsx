import React from "react";
import "./LargeList.css";

const LargeList = React.memo(({ items }) => {
  return (
    <div className="list-container">
      {Array.from({ length: 1000 }, (_, i) => (
        <div key={i} className="list-item">
          Item {i + 1}
        </div>
      ))}
    </div>
  );
});

export default LargeList;
