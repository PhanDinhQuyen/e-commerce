import { useParams } from "react-router-dom";
import { GlobalState } from "~/components/GlobalState";

import { useContext, useEffect, useState } from "react";

import Loading from "~/components/Loading";

import classNames from "classnames/bind";
import style from "./History.module.scss";

const cx = classNames.bind(style);

export default function History() {
  const state = useContext(GlobalState);
  const [history] = state.user.history;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    if (params.id) {
      for (let i = 0; i < history.length; i++) {
        if (params.id === history[i]._id) {
          setOrderDetails(history[i]);
          break;
        }
      }
    }
    setLoading(false);
  }, [params.id, history]);

  if (!orderDetails) return null;
  return loading ? (
    <Loading />
  ) : (
    <div className={cx("wrapper")}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{orderDetails.name}</td>
            <td>{orderDetails.address.address_line_1}</td>
            <td>{orderDetails.address.postal_code}</td>
            <td>{orderDetails.address.country_code}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item) => (
            <tr key={item._id}>
              <td className={cx("image")}>
                <img src={item.image.url} alt='' />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>$ {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
