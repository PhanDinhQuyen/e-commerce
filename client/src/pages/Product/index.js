import { useContext } from "react";
import { GlobalState } from "~/components";

export default function Product() {
  const state = useContext(GlobalState);

  const products = state.productsAPI.products;
  console.log({ products });

  return <h1>Product</h1>;
}
