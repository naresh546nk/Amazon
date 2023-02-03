import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Store from "../Store";

const UserDropdown = () => {
  const { userInfo, dispatch } = useContext(Store);
  const signoutHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
  };
  return (
    <div className="dropdown">
      {userInfo ? (
        <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
          <LinkContainer to="/profile">
            <NavDropdown.Item>User Profile</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/orderhistory">
            <NavDropdown.Item>Order History</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <Link
            className="dropdown-item"
            to="#signout"
            onClick={signoutHandler}
          >
            Sign Out
          </Link>
        </NavDropdown>
      ) : (
        <Nav className="me-auto ">
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </Nav>
      )}
    </div>
  );
};

export default UserDropdown;
