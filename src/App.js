import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Store from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import UserDropdown from "./screens/UserDropdown";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import RequiredAuth from "./components/RequiredAuth";
import { useSelector } from "react-redux";
import ReduxStore from "./ReduxStore";

function App() {
  const cart = useSelector((ReduxStore) => ReduxStore.cart);
  const numberOfItems = cart.cartItem.reduce(
    (acc, product) => acc + product.orderCount,
    0
  );

  console.log(numberOfItems);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={10} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazona</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {numberOfItems > 0 && (
                    <Badge pill bg="danger">
                      {numberOfItems}
                    </Badge>
                  )}
                </Link>
              </Nav>

              <UserDropdown />
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route
                path="/cart"
                element={
                  // <RequiredAuth>
                  <CartScreen />
                  // </RequiredAuth>
                }
              />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className="text-center">All right are reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
