const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    name: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      default: 1,
    },

      image: {
        type: String,
        default: "",
      },

      isBowl: {
        type: Boolean,
        default: false,
      },

      bowlIngredients: {
        type: [
          {
            name: { type: String, default: "" },
            quantity: { type: Number, default: 1 },
            price: { type: Number, default: 0 },
            image: { type: String, default: "" },
            category: { type: String, default: "" },
          },
        ],
        default: [],
      },
  },
  { _id: false }
);

const trackingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    date: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    razorpayOrderId: {
      type: String,
      default: null,
      sparse: true,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    phonePeOrderId: {
      type: String,
      default: null,
    },

    phonePeTransactionId: {
      type: String,
      default: null,
    },

    paymentMethod: {
      type: String,
      enum: [
        "COD",
        "Cash on Delivery",
        "PhonePe",
        "Razorpay",
        "UPI",
        "Card",
        "Online",
      ],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    amount: {
      type: Number,
      required: true,
      default: 0,
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: [
        "Order Placed",
        "Order Confirmed",
        "Preparing",
        "Shipped",
        "Out Of Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Placed",
    },

    customer: {
      name: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
        lowercase: true,
        trim: true,
        index: true,
      },

      phone: {
        type: String,
        default: "",
      },
    },

    address: {
      name: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      addressLine: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      pincode: {
        type: String,
        default: "",
      },
    },

    items: {
      type: [orderItemSchema],
      default: [],
    },

    tracking: {
      type: [trackingSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
