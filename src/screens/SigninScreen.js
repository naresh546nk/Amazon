import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Store from "../Store";
import { toast } from "react-toastify";
import { getError } from "../util";

const SigninScreen = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch, userInfo } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/users/signin";
    try {
      const { data } = await axios.post(url, {
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      console.log(data);
      navigate(redirect);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my=3"> Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="emai"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>

        <div className="mb-3">
          New custoer ?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SigninScreen;
