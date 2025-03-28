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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="interceptor-container">
      {loading ? <div className="loading">Loading...</div> : <ul>{data.map(item => <li key={item.id}>{item.title}</li>)}</ul>}
    </div>
  );
};

export default AxiosInterceptors;
