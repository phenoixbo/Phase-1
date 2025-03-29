import React, { memo } from "react";
import { FixedSizeList as List } from "react-window";
import "./UserList.css";

const UserList = memo(({ users }) => {
  const Row = ({ index, style }) => (
    <div style={style} className="user-item">
      {users[index].name} - {users[index].email}
    </div>
  );

  return (
    <List
      height={200}
      itemCount={users.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
});

export default UserList;
