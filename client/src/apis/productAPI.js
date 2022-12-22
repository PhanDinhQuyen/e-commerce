import { useEffect } from "react";
import { useState } from "react";
import errorInfor from "~/utils/errorInfor";
import * as httpRequest from "~/utils/httpRequest";

export default function ProductAPI() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await httpRequest.get("/api/product");

        setProducts(data.products);
      } catch (error) {
        errorInfor(error);
      }
    })();
  }, []);

  return [products, setProducts];
}
