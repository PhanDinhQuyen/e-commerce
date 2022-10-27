import { GlobalState } from "~/components/GlobalState";
import { useContext, useState } from "react";
import classNames from "classnames/bind";
import style from "./Cart.module.scss";
import * as httpRequest from "~/utils/httpRequest";
import { useEffect } from "react";
import PayPalButton from "./PayPal";

const cx = classNames.bind(style);

export default function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.user.cart || [];
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
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

  const handleDecrement = (id) => {
    let product;
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity -= 1;
        product = item;
      }
    });
    if (product.quantity <= 0) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
    }

    setCart([...cart]);
    addToCart(cart);
  };
  const hanleIncrement = (id) => {
    cart.forEach((item) => (item._id === id ? (item.quantity += 1) : item));
    setCart([...cart]);
    addToCart(cart);
  };
  const handleRemoveItem = (id) => {
    cart.forEach((item, index) => item._id === id && cart.splice(index, 1));
    setCart([...cart]);
    addToCart(cart);
  };
  const renderCart = () => {
    return (
      <>
        <div className={cx("wrapper_product")}>
          {cart.reverse().map((product) => (
            <div key={product._id} className={cx("product_detail")}>
              <div className={cx("product_img")}>
                <img src={product.image.url} alt='' />
              </div>
              <div className={cx("product_content")}>
                <div>
                  <h2>{product.title}</h2>
                  <span>Price: </span>$<b>{product.price}</b>
                </div>
                <div className={cx("amount")}>
                  <button onClick={() => handleDecrement(product._id)}>
                    -
                  </button>
                  <p>{product.quantity}</p>
                  <button onClick={() => hanleIncrement(product._id)}>+</button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(product._id)}
                className={cx("product_del")}
              >
                Del
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={cx("wrapper")}>
      {cart.length > 0 ? (
        renderCart()
      ) : (
        <div className={cx("wrapper_product")}>Cart Empty</div>
      )}

      <div className={cx("payment")}>
        <div className={cx("fixed_payment")}>
          Payment: {total}
          <PayPalButton amount={total} />
        </div>
      </div>
    </div>
  );
}
