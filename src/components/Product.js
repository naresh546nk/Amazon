import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import Store from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./features/cartSlice";
import ReduxStore from "../ReduxStore";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((ReduxStore) => ReduxStore.cart);
  console.log("cart", cart);
  const addToCartHandler = () => {
    dispatch(addToCart(product));
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
          disabled={product.countInStocks === 0}
        >
          {product.countInStocks > 0 ? "Add to Cart" : "Out of stock"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
