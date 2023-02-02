import { createContext, useReducer } from "react";

const Store = createContext();

const initialState = {
  cart: new Map(),
  numberOfItems: 0,
  amount: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const product = action.payload;
      const map = new Map(state.cart);
      map.set(product, map.get(product) ? map.get(product) + 1 : 1);
      return { ...state, cart: map, numberOfItems: state.numberOfItems + 1 };
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
