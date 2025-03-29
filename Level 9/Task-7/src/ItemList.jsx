import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ItemList.css";

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Headphones", category: "Electronics", price: 150 },
  { id: 3, name: "Shoes", category: "Fashion", price: 80 },
  { id: 4, name: "T-Shirt", category: "Fashion", price: 25 },
  { id: 5, name: "Book", category: "Books", price: 15 },
  { id: 6, name: "Monitor", category: "Electronics", price: 300 },
  { id: 7, name: "Jacket", category: "Fashion", price: 100 },
];

const ItemList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredItems, setFilteredItems] = useState(items);

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("price") || "");

  useEffect(() => {
    const params = {};
    if (searchTerm) params.q = searchTerm;
    if (category) params.category = category;
    if (maxPrice) params.price = maxPrice;
    setSearchParams(params);

    filterItems();
  }, [searchTerm, category, maxPrice]);

  const filterItems = () => {
    let result = items;

    if (searchTerm) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((item) => item.category === category);
    }

    if (maxPrice) {
      result = result.filter((item) => item.price <= parseInt(maxPrice));
    }

    setFilteredItems(result);
  };

  return (
    <div className="search-container">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Books">Books</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="item-list">
        {filteredItems.length ? (
          filteredItems.map((item) => (
            <div key={item.id} className="item-card">
              <h4>{item.name}</h4>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default ItemList;
