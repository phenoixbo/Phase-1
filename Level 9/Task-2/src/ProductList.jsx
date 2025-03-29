import React from 'react';
import { Link } from 'react-router-dom';

// Dummy product data
const products = [
  { id: 1, name: 'Apple', description: 'It gives you an Strength to your bod' },
  { id: 2, name: 'Grapes', description: 'It gives you an Strength to your body' },
  { id: 3, name: 'Orange', description: 'It gives you an Strength to your body' },
];

function ProductList() {
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
