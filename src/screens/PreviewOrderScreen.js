import React, { useContext, useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import ReduxStore from "../ReduxStore";
import Store from "../Store";

const PreviewOrderScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(Store);
  const { address, paymentMethod } = useSelector(
    (ReduxStore) => ReduxStore.user
  );
  const cart = useSelector((ReduxStore) => ReduxStore.cart);
  console.log("cart :", cart);

  console.log(userInfo);
  console.log(address);

  useEffect(() => {
    if (!address) {
      navigate("/shipping");
    }
  }, [address, navigate]);

  const itemsCost = cart.cartItem.reduce(
    (acc, p) => acc + p.price + p.orderCount,
    0
  );
  const shippingCost = 5;
  const tax = itemsCost * 0.05;
  const total = itemsCost + shippingCost + tax;

  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name :</strong> {address.fullName} <br />
                <strong>Address :</strong> {address.street} ,{address.city},
                {address.postalCode}, {address.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method :</strong> {paymentMethod} <br />
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items List</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItem.map((product) => (
                  <ListGroup.Item key={product.key}>
                    <Row className="align-item-center">
                      <Col md={6}>
                        <img
                          className="img-fluid rounder img-thumbnail"
                          src={product.image}
                          alt={product.name}
                        />{" "}
                        <span> {product.name} </span>
                      </Col>
                      <Col md={3}> {product.orderCount} </Col>
                      <Col md={3}>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsCost.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingCost.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${tax.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${total.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button type="button">Place Order</Button>
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

export default PreviewOrderScreen;
