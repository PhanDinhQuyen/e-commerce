import { useState, useEffect, useMemo } from "react";
import { toastError, toastSuccess } from "~/components/Toast";

import errorInfor from "~/utils/errorInfor";
import * as httpRequest from "~/utils/httpRequest";

export default function UserAPI({ token }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  const fetchUserInfo = useMemo(
    () => async () => {
      try {
        const data = await httpRequest.get(`/user/infor`, {
          headers: { Authorization: token },
        });
        setIsLogin(true);
        setIsAdmin(data.role === Number(process.env.REACT_APP_ROLE_ADMIN));
        setCart(data.cart);
      } catch (error) {
        errorInfor(error);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchUserInfo();
  }, [token, fetchUserInfo]);

  const addItemToCart = async (product) => {
    if (!isLogin) return toastError("Please login!");

    const check = cart.every((item) => item._id !== product._id);

    if (check) {
      toastSuccess("This product add to cart successfully");
      setCart([...cart, { ...product, quantity: 1 }]);
      try {
        await httpRequest.patch(
          "/user/addcart",
          { cart: [...cart, { ...product, quantity: 1 }] },
          {
            headers: { Authorization: token },
          }
        );
      } catch (error) {
        errorInfor(error);
      }
    } else {
      toastError("This product has already been added to cart.");
    }
  };

  return {
    login: [isLogin, setIsLogin],
    admin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addItemToCart,
  };
}
