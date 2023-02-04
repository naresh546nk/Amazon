import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import Store from "../Store";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteToCart,
  removeToCart,
} from "../components/features/cartSlice";
import ReduxStore from "../ReduxStore";

const CartScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((ReduxStore) => ReduxStore.cart);
  const { numberOfItems, amount } = useSelector(
    (ReduxStore) => ReduxStore.cart
  );
  console.log("cart", cart);
  //const { dispatch } = useContext(Store);

  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    localStorage.setItem("cartItem", JSON.stringify(cart.cartItem));
  };
  const removeToCartHandler = (product) => {
    dispatch(removeToCart(product));
  };
  const deleteToCartHandler = (product) => {
    dispatch(deleteToCart(product));
  };
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Shoping Cart</title>
      </Helmet>
      <h1>Shoping Cart</h1>
      <Row>
        <Col md={8}>
          {numberOfItems <= 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cart.cartItem.map((product) => (
                <ListGroup.Item key={product.id}>
                  <Row className="align-item-center">
                    <Col md={4}>
                      <img
                        className="img-fluid rounded img-thumbnail"
                        src={product.image}
                        alt={product.name}
                      />
                      <Link to={`product/${product.id}`}>
                        <span>{product.name}</span>{" "}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={product.countInStocks === 1}
                        onClick={() => removeToCartHandler(product)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{product.orderCount}</span>
                      <Button
                        onClick={() => addToCartHandler(product)}
                        variant="light"
                        disabled={product.countInStocks === product.orderCount}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${product.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => deleteToCartHandler(product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({numberOfItems} items) $ {amount}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      disabled={numberOfItems === 0}
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                    >
                      Process to checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
