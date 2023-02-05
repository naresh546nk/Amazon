import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { setPaymentMethod } from "../components/features/users/userSlice";
import ReduxStore from "../ReduxStore";
import Store from "../Store";

const PaymentMethodScreen = () => {
  const [paymentMethod, setPaymentMethodName] = useState("PayPal");
  const dispatch = useDispatch();
  //const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit payment method");
    dispatch(setPaymentMethod(paymentMethod));

    navigate("/order");
  };

  const user = useSelector((ReduxStore) => ReduxStore.user);
  console.log("user :", user);
  console.log("paymentMethod", paymentMethod);

  useEffect(() => {
    if (!user.address) {
      navigate("/shipping");
    }
  }, [user, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3"> Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="my-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="payPal"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onClick={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onClick={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
