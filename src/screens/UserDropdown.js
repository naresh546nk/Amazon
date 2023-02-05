import React, { useContext, useEffect } from "react";
import { Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReduxStore from "../ReduxStore";
import Store from "../Store";

const UserDropdown = ({ signoutHandler }) => {
  const { userInfo } = useContext(Store);

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
