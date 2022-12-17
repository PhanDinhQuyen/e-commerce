import classNames from "classnames/bind";
import { useContext } from "react";
import { GlobalState } from "~/components/GlobalState";

import CartItem from "~/components/Cart/CartItem";
import PayPalButton from "./PayPal";

import * as httpRequest from "~/utils/httpRequest";

import style from "./Cart.module.scss";
import { useEffect, useState } from "react";
const cx = classNames.bind(style);

export default function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.user.cart || [];
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    let totalPrice = 0,
      totalQuantity = 0;
    const getTotal = () => {
      for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].quantity * cart[i].price;
        totalQuantity += cart[i].quantity;
      }
    };
    getTotal();
    setTotal(totalPrice);
    setTotalItems(totalQuantity);
  }, [cart]);
  const addToCart = async (cart) => {
    await httpRequest.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };
  const handleIncrement = (id) => {
    const newCart = cart.map((item) =>
      item._id === id
        ? Object.assign(item, { quantity: item.quantity + 1 })
        : item
    );

    setCart(newCart);
    addToCart(newCart);
  };

  const handleDecrement = (id) => {
    const newCart = cart.map((item) =>
      item._id === id
        ? Object.assign(item, { quantity: item.quantity - 1 })
        : item
    );

    setCart(newCart);
    addToCart(newCart);
  };

  const handleDelete = (id) => {
    const newCart = cart.filter((item) => item._id !== id);

    setCart(newCart);
    addToCart(newCart);
  };

  return (
    <div className={cx("wrapper")}>
      <h2>Shopping Cart</h2>
      <p>You have {totalItems} item in your cart!</p>
      <div className={cx("cart")}>
        {cart.map((item) => {
          const obj = {
            handleDecrement,
            handleIncrement,
            handleDelete,
            ...item,
          };
          return <CartItem key={item._id} {...obj} />;
        })}
      </div>
      {totalItems > 0 && <p className={cx("total")}>Total: {total}$</p>}
      {totalItems > 0 && (
        <div className={cx("paypal")}>
          <PayPalButton amount={total} />
        </div>
      )}
    </div>
  );
}
