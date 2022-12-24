import { useState } from "react";

import * as httpRequest from "~/utils/httpRequest";
import errorInfor from "~/utils/errorInfor";
import { useEffect } from "react";

export default function CategoryAPI() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const data = await httpRequest.get("/api/category");
        setCategories(data.categories);
      } catch (error) {
        errorInfor(error);
      }
    })();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}
