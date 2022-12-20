import { useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toastError, toastSuccess } from "~/components/Toast";
import * as httpRequest from "~/utils/httpRequest";

import { GlobalState } from "~/components/GlobalState";
import errorInfor from "~/utils/errorInfor";

const initialOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "USD",
};

const ButtonWrapper = ({ amount }) => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.user.cart;
  const [token] = state.token;
  const currency = "USD";
  const style = { layout: "vertical" };

  return (
    <>
      <PayPalButtons
        style={style}
        disabled={false}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={async function (data, actions) {
          try {
            const details = await actions.order.capture();
            const infor = details.purchase_units[0];
            const paymentID = data.payerID;
            const address = infor.shipping.address;

            await httpRequest.post(
              "/api/payment",
              { cart, paymentID, address },
              { headers: { Authorization: token } }
            );
            await httpRequest.patch(
              "/user/addcart",
              { cart: [] },
              { headers: { Authorization: token } }
            );
            setCart([]);
            toastSuccess("Order has been successfully");
          } catch (error) {
            toastError("Error while updating");
            errorInfor(error);
          }
        }}
      />
    </>
  );
};

export default function PayPalButton({ amount = 0 }) {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          ...initialOptions,
          components: "buttons",
        }}
      >
        <ButtonWrapper showSpinner={true} amount={amount} />
      </PayPalScriptProvider>
    </div>
  );
}
