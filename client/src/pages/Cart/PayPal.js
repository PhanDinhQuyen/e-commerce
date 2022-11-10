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

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ amount }) => {
  const state = useContext(GlobalState);
  // eslint-disable-next-line no-unused-vars
  const [_, setCart] = state.user.cart;
  const [token] = state.token;
  const currency = "USD";
  const style = { layout: "vertical" };
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component

  return (
    <>
      <PayPalButtons
        style={style}
        disabled={false}
        // forceReRender={[amount, currency, style]}
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
          return actions.order.capture().then(async function () {
            try {
              await httpRequest.patch(
                "/user/addcart",
                { cart: [] },
                {
                  headers: { Authorization: token },
                }
              );
              setCart([]);
              toastSuccess("Order has been successfully");
            } catch (error) {
              toastError("Error while updating");
              errorInfor(error);
            }
          });
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
        <ButtonWrapper showSpinner={false} amount={amount} />
      </PayPalScriptProvider>
    </div>
  );
}
