const API_URL = "http://localhost:5000/api";

// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

export const createRazorpayOrder = async (
  amount,
  customer = {}
) => {
  try {
    console.log(
      "Creating Razorpay order for amount:",
      amount
    );

    const response = await fetch(
      `${API_URL}/payment/create-order`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount,

          customerName:
            customer?.name || "",

          customerEmail:
            customer?.email || "",

          customerPhone:
            customer?.phone || "",
        }),
      }
    );

    console.log(
      "Backend response status:",
      response.status
    );

    const data = await response.json();

    console.log(
      "Backend response:",
      data
    );

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to create payment order"
      );
    }

    return data;

  } catch (error) {
    console.error(
      "createRazorpayOrder ERROR:",
      error
    );

    throw error;
  }
};


// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

export const verifyRazorpayPayment = async (
  paymentData
) => {
  try {
    const response = await fetch(
      `${API_URL}/payment/verify`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(paymentData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Payment verification failed"
      );
    }

    return data;

  } catch (error) {
    console.error(
      "verifyRazorpayPayment ERROR:",
      error
    );

    throw error;
  }
};