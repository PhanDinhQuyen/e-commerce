import { GlobalState } from "~/components/GlobalState";
import { useContext, useState } from "react";

import * as httpRequest from "~/utils/httpRequest";
import { useEffect } from "react";
import errorInfor from "~/utils/errorInfor";

export default function Manage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await httpRequest.get("/api/product/all");
        setProducts(data.product);
      } catch (err) {
        errorInfor(err);
      }
    })();
  }, []);

  return (
    <div style={{ marginTop: "6rem" }}>
      <ul>
        {products.map((product) => {
          return <li key={product._id}>{product.title}</li>;
        })}
      </ul>
    </div>
  );
}
