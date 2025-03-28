import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Assuming CSS is in the same directory

const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    // Create a cancel token
    const cancelTokenSource = axios.CancelToken.source();

    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          cancelToken: cancelTokenSource.token,
        });
        if (!cancelled) {
          setData(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Something went wrong!');
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function: cancel the request if the component unmounts
    return () => {
      cancelTokenSource.cancel('Component unmounted, request cancelled');
      setCancelled(true);
    };
  }, [cancelled]); // Dependency array ensures effect runs on mount

  return (
    <div className="container">
      <div className="card">
        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {data && !loading && (
          <div>
            <h2>Fetched Data:</h2>
            <ul>
              {data.slice(0, 5).map(post => (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchDataComponent;
