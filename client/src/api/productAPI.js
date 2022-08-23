import { useEffect, useState } from "react";
import * as httpRequest from "~/utils/httpRequest";
export default function ProductAPI() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await httpRequest.get("/api/products");
      const data = await response.products;
      setProducts(data);
      console.log(data);
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
  };
}
