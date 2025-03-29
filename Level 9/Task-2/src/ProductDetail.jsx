import React from 'react';
import { useParams } from 'react-router-dom';

// Dummy product data
const products = [
  { id: 1, name: 'Apple', description: 'It gives you an Strength to your body', price: '100' },
  { id: 2, name: 'Orange', description: 'It gives you an Strength to your body', price: '200' },
  { id: 3, name: 'Grapes', description: 'It gives you an Strength to your body', price: '30' },
];

function ProductDetail() {
  const { id } = useParams();  // Extract the product ID from the URL
  const product = products.find((p) => p.id === parseInt(id));  // Find the product by ID

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
}

export default ProductDetail;
