import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import UserList from "../Components/UserList";

const fetchUsers = async (page) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`
  );
  return data;
};

const Users = () => {
  const [page, setPage] = useState(1);

  const { data: users, isLoading } = useQuery(["users", page], () =>
    fetchUsers(page)
  );

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const memoizedUsers = useMemo(() => users, [users]);

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Users List (Page {page})</h2>
      <UserList users={memoizedUsers} />
      <button onClick={prevPage} disabled={page === 1}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Users;
