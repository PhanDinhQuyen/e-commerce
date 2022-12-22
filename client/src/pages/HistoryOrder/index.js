import { useEffect } from "react";
import errorInfor from "~/utils/errorInfor";
import * as httpRequest from "~/utils/httpRequest";
import { GlobalState } from "~/components/GlobalState";
import { useContext } from "react";
import style from "./Manage.module.scss";
import classNames from "classnames/bind";

import HistoryOrderItem from "~/components/HistoryOrderItem";

const cx = classNames.bind(style);
export default function HistoryOrder() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.user.admin;
  const [token] = state.token;
  const [history, setHistory] = state.user.history;
  useEffect(() => {
    (async () => {
      try {
        if (isAdmin) {
          const data = await httpRequest.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(data);
        } else {
          const data = await httpRequest.get("/user/payment", {
            headers: { Authorization: token },
          });
          setHistory(data);
        }
      } catch (error) {
        errorInfor(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAdmin]);

  const changeStatus = async (status) => {
    try {
      await httpRequest.patch(
        "/api/payment",
        { ...status },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      errorInfor(error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <h3>History Order</h3>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of Purchased</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <HistoryOrderItem
              key={item._id}
              changeStatus={changeStatus}
              isAdmin={isAdmin}
              {...item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
