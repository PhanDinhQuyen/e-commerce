import { useState } from "react";
import { useEffect } from "react";
import errorInfor from "~/utils/errorInfor";
import * as httpRequest from "~/utils/httpRequest";
import { GlobalState } from "~/components/GlobalState";
import { useContext } from "react";

import axios from "axios";
export default function Manage() {
  const [order, setOrder] = useState([]);

  const state = useContext(GlobalState);
  const [token] = state.token;
  useEffect(() => {
    (async () => {
      try {
        const data = await httpRequest.get("/api/payment", {
          headers: { Authorization: token },
        });
        setOrder(data);
        console.log(data);
      } catch (error) {
        errorInfor(error);
      }
    })();
  }, [token]);

  return (
    <div>
      <h3>History Order</h3>
    </div>
  );
}
