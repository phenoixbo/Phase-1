import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

// Setting up Axios interceptors
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer sample-token';
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) alert('Unauthorized! Please check your credentials.');
      if (error.response.status === 404) alert('Resource not found!');
      if (error.response.status === 500) alert('Server error! Please try again later.');
    }
    return Promise.reject(error);
  }
);

const AxiosInterceptors = () => {
  const [data, setData] = useState({ posts: [], users: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/users')
        ]);

        setData({
          posts: postsResponse.data.slice(0, 5),
          users: usersResponse.data.slice(0, 5)
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="interceptor-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="fade-in">
          <h3>Posts:</h3>
          <ul>
            {data.posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <h3>Users:</h3>
          <ul>
            {data.users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AxiosInterceptors;
