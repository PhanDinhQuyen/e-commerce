import * as httpRequest from "~/utils/httpRequest";
import errorInfor from "~/utils/errorInfor";

import { useState, useEffect } from "react";

export default function ProductAPI() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //Get product
    (async () => {
      try {
        const data = await httpRequest.get(`/api/product`);
        setProducts(data.products);
      } catch (error) {
        errorInfor(error);
      }
    })();
    //
  }, []);
  return [products, setProducts];
}
