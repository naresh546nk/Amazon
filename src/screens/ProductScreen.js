import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import Rating from "../components/Rating";

const reducer = (state, action) => {
  switch (action.type) {
    case "FEATCH_REQUEST":
      return { ...state, loading: true };
    case "FEATCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const { id } = useParams();

  const initialState = {
    product: {},
    loading: false,
    error: "",
  };
  const [{ product, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const featchData = async () => {
    dispatch({ type: "FEATCH_REQUEST" });
    try {
      const result = await axios.get(`/api/products/id/${id}`);
      dispatch({ type: "FEATCH_SUCCESS", payload: result.data });
    } catch (error) {
      dispatch({ type: "FEATCH_FAIL", payload: error.message });
    }
  };
  useEffect(() => {
    featchData();
  }, [id]);

  return loading ? (
    <div>Loading.. </div>
  ) : error ? (
    <div> {error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description : <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col> Price: </Col>
                    <Col> {product.price} </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col> Status: </Col>
                    <Col>
                      {product.countInStocks > 0 ? (
                        <Badge bg="success"> In Stock</Badge>
                      ) : (
                        <Badge bg="danger"> Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStocks > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
