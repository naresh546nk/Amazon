import React from "react";
import { useParams } from "react-router";

const ProductScreen = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>This is product screen path : {id}</h1>
    </div>
  );
};

export default ProductScreen;
