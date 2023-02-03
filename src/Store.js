import { createContext, useReducer, useEffect } from "react";

const Store = createContext();

const getCartData = () => {
  const cartItem = localStorage.getItem("cartItem");
  if (cartItem) {
    const map = new Map(JSON.parse(cartItem));
    return map;
  }
  return new Map();
};
const getNumberOfItems = () => {
  const numberOfItems = localStorage.getItem("numberOfItems");
  if (numberOfItems) {
    return JSON.parse(numberOfItems);
  }
  return 0;
};
const getAmount = () => {
  const amount = localStorage.getItem("amount");
  if (amount) {
    return JSON.parse(amount);
  }
  return 0;
};

const getUserInfo = () => {
  const user = localStorage.getItem("userInfo");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
const initialState = {
  cart: getCartData(),
  numberOfItems: getNumberOfItems(),
  amount: getAmount(),
  userInfo: getUserInfo(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      var product = action.payload;
      var map = new Map(state.cart);
      map.set(product, map.get(product) ? map.get(product) + 1 : 1);
      return {
        ...state,
        cart: map,
        numberOfItems: state.numberOfItems + 1,
        amount: state.amount + product.price,
      };
    case "REMOVE_TO_CART":
      product = action.payload;
      map = new Map(state.cart);
      if (map.get(product) > 1) {
        map.set(product, map.get(product) - 1);
      } else {
        map.delete(product);
      }
      return {
        ...state,
        cart: map,
        numberOfItems: state.numberOfItems - 1,
        amount: state.amount - product.price,
      };
    case "DELETE_TO_CART":
      product = action.payload;
      map = new Map(state.cart);
      const count = map.get(product);
      map.delete(product);
      return {
        ...state,
        cart: map,
        numberOfItems: state.numberOfItems - count,
        amount: state.amount - product.price * count,
      };

    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(Array.from(state.cart)));
    localStorage.setItem("numberOfItems", JSON.stringify(state.numberOfItems));
    localStorage.setItem("amount", JSON.stringify(state.amount));
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
  }, [state.cart, state.amount, state.numberOfItems, state.userInfo]);
  return (
    <Store.Provider value={{ ...state, dispatch }}>{children}</Store.Provider>
  );
};

export default Store;
