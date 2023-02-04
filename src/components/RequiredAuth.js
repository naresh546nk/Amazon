import React, { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import Store from "../Store";

const RequiredAuth = () => {
  const { userInfo } = useContext(Store);

  return userInfo ? Children : <Navigate to="/signin" replace />;
};

export default RequiredAuth;
