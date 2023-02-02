import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import Store from "../Store";

const Product = ({ product }) => {
  const { dispatch } = useContext(Store);
  const addToCartHandler = () => {
    console.log("calling cartHandler");
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <Card key={product.id}>
      <Link to={`/product/${product.id}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body className="product-info">
        <Link to={`/product/${product.id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <Button
          onClick={() => addToCartHandler(product)}
          className="btn-primary"
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
