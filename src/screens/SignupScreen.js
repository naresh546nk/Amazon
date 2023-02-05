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

const SignupScreen = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const { dispatch, userInfo } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/users/signup";
    try {
      if (password !== confirmPassword) {
        throw Error("Confirm passwod did not mached .");
      }
      const { data } = await axios.post(url, {
        name,
        email,
        password,
        isAdmin,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      console.log(data);
      toast.success("Loged in successfully ..");
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
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
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
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>isAdmin</Form.Label>
          Yes
          <Form.Check
            inline
            name="isAdmin"
            value={isAdmin}
            onChange={(e) => {
              setIsAdmin(true);
            }}
            type="radio"
          ></Form.Check>
          No
          <Form.Check
            inline
            name="isAdmin"
            value={isAdmin}
            onChange={(e) => {
              setIsAdmin(false);
            }}
            type="radio"
          ></Form.Check>
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>

        <div className="mb-3">
          Already have an account ?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignupScreen;
