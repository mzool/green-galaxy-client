import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Paypal() {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId:
            "AcpsJBYEUFQVmLDQuhXDDAWQpHc2TNuRQF78RWkUziB7rqEzgYNAYs153m9a8D1jUdndh_hB7Jz0oC4i",
        }}
      >
        <PayPalButtons style={{ layout: "horizontal" }} />
      </PayPalScriptProvider>
    </div>
  );
}

export default Paypal