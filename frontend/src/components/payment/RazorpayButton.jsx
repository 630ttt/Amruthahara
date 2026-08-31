import React, { useEffect, useState } from "react";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../services/paymentService";

const RazorpayButton = ({ amount, customer }) => {
  const [razorpayLoaded, setRazorpayLoaded] =
    useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () => {
      console.log("Razorpay SDK loaded");
      setRazorpayLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      setRazorpayLoaded(false);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert(
        "Razorpay is still loading. Please try again."
      );
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Creating Razorpay order for:",
        amount
      );

      const data =
        await createRazorpayOrder(amount);

      if (!data.success) {
        alert("Unable to create payment order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "Amruthahara",

        description:
          "Amruthahara Organic Products",

        order_id: data.order.id,

        prefill: {
          name: customer?.name || "",
          email: customer?.email || "",
          contact: customer?.phone || "",
        },

        theme: {
          color: "#166534",
        },

        handler: async function (response) {
          try {
            console.log(
              "Razorpay payment response:",
              response
            );

            const verificationData = {
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            };

            const result =
              await verifyRazorpayPayment(
                verificationData
              );

            if (result.success) {
              alert(
                "Payment successful! Your order has been placed."
              );

              console.log(
                "Payment verified:",
                result
              );

              // NEXT STEP:
              // Create order in MongoDB here.

            } else {
              alert(
                "Payment verification failed."
              );
            }
          } catch (error) {
            console.error(
              "Verification error:",
              error
            );

            alert(error.message);
          }
        },

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay checkout closed"
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          alert(
            response.error?.description ||
              "Payment failed."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={
        !razorpayLoaded || loading
      }
      style={styles.button}
    >
      {loading
        ? "Opening Razorpay..."
        : !razorpayLoaded
        ? "Loading Payment..."
        : `Pay ₹${amount} with Razorpay`}
    </button>
  );
};

const styles = {
  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#166534",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default RazorpayButton;