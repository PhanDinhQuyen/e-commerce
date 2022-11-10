import { GlobalState } from "~/components/GlobalState";
import { useContext, useState } from "react";
import classNames from "classnames/bind";
import style from "./Cart.module.scss";
import * as httpRequest from "~/utils/httpRequest";
import { useEffect } from "react";
import PayPalButton from "./PayPal";
import { RiAddLine, RiCloseLine, RiSubtractLine } from "react-icons/ri";

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
    const cartCurrent = cart
      .map((item) => {
        if (item._id === id) {
          return item.quantity > 0
            ? { quantity: --item.quantity, ...item }
            : null;
        }

        return item;
      })
      .filter((item) => !!item);
    setCart(cartCurrent);
    addToCart(cartCurrent);
  };
  const hanleIncrement = (id) => {
    const cartCurrent = cart.map((item) =>
      item._id === id ? { quantity: ++item.quantity, ...item } : item
    );
    setCart(cartCurrent);
    addToCart(cartCurrent);
  };
  const handleRemoveItem = (id) => {
    const cartCurrent = cart.filter((item) => item._id !== id);
    setCart(cartCurrent);
    addToCart(cartCurrent);
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
                    <RiSubtractLine />
                  </button>
                  <p>{product.quantity}</p>
                  <button onClick={() => hanleIncrement(product._id)}>
                    <RiAddLine />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(product._id)}
                className={cx("product_del")}
              >
                <RiCloseLine />
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
          <div>
            <h2>Details:</h2>
            <div>
              {cart.map((item) => {
                const { title, price, quantity, _id } = item;
                return (
                  <div key={_id}>
                    <div>{title}:</div>
                    <div>
                      {price}$ x {quantity}&nbsp;:&nbsp;
                      {+price * +quantity}$
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={cx("total")}>
            Payment: <span>{total.toFixed(2)}</span>$
          </div>
          <PayPalButton amount={total} />
        </div>
      </div>
    </div>
  );
}
