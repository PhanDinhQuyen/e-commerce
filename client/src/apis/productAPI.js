import { useState } from "react";

export default function ProductAPI() {
  const [products, setProducts] = useState([]);
  return [products, setProducts];
}
