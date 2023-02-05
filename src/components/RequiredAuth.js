import React, { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import Store from "../Store";

const RequiredAuth = ({ children }) => {
  const { userInfo } = useContext(Store);

  return userInfo ? children : <Navigate to="/signin" replace />;
};

export default RequiredAuth;
