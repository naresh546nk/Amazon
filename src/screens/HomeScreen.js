import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../util";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FEATCH_REQUEST":
      return { ...state, loading: true };
    case "FEATCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FEATCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const initialState = {
    products: [],
    loading: false,
    error: "",
  };
  const [{ products, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const featchData = async () => {
    dispatch({ type: "FEATCH_REQUEST" });
    try {
      const result = await axios.get("/api/products");
      dispatch({ type: "FEATCH_SUCCESS", payload: result.data });
    } catch (error) {
      dispatch({ type: "FEATCH_FAIL", payload: getError(error) });
    }
  };
  useEffect(() => {
    featchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
