import { createContext, useReducer } from "react";

const Store = createContext();

const initialState = {
  cart: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ ...state, dispatch }}>{children}</Store.Provider>
  );
};

export default Store;
