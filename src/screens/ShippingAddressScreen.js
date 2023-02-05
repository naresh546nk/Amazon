import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { setUserAddress } from "../components/features/users/userSlice";
import ReduxStore from "../ReduxStore";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = () => {
  const { address } = useSelector((ReduxStore) => ReduxStore.user);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(address?.fullName || "");
  const [street, setStreet] = useState(address?.street || "");
  const [city, setCity] = useState(address?.city || "");
  const [postalCode, setPostalCode] = useState(address?.postalCode || "");
  const [country, setCountry] = useState(address?.country || "");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const userAddress = {
      fullName,
      street,
      city,
      postalCode,
      country,
    };

    dispatch(setUserAddress(userAddress));
    localStorage.setItem("userAddress", JSON.stringify(userAddress));
    navigate("/payment");

    console.log("submited the address details");
  };

  console.log("Redux store", address);
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup className="mb-3" controlId="fullNmae">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="street">
            <Form.Label>Street / Village </Form.Label>
            <Form.Control
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <div className="mb-3">
              <Button variant="primary" type="submit">
                Continue
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddressScreen;
