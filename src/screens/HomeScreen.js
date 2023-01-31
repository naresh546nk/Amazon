import React from "react";
import data from "../data";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {data.products.map(product => (
          <div className="product" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.id}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
