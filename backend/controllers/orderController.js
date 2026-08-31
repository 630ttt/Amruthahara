const Order = require("../models/Order");
const mongoose = require("mongoose");

const customerOrderFilter = (user) => {
  const email = String(user.email || "")
    .trim()
    .toLowerCase();

  const clauses = [{ userId: user._id }];

  if (email) {
    clauses.push({ "customer.email": email });
  }

  return { $or: clauses };
};

const orderBelongsToCustomer = (order, user) => {
  if (!order || !user) {
    return false;
  }

  const userId = String(user._id);
  const orderUserId = order.userId ? String(order.userId) : "";

  if (orderUserId && orderUserId === userId) {
    return true;
  }

  const userEmail = String(user.email || "")
    .trim()
    .toLowerCase();
  const orderEmail = String(order.customer?.email || "")
    .trim()
    .toLowerCase();

  return Boolean(userEmail && orderEmail && userEmail === orderEmail);
};

// =====================================================
// CONSTANTS
// =====================================================

const ORDER_STATUSES = [
  "Order Placed",
  "Order Confirmed",
  "Preparing",
  "Shipped",
  "Out Of Delivery",
  "Delivered",
  "Cancelled",
];

const TRACKING_STATUSES = [
  "Order Placed",
  "Order Confirmed",
  "Preparing",
  "Shipped",
  "Out Of Delivery",
  "Delivered",
  "Cancelled",
];

// =====================================================
// TRACKING BUILDER
// =====================================================

const createTracking = () => {
  const now = new Date();

  return [
    {
      title: "Order Placed",
      description:
        "Your order has been successfully placed.",
      completed: true,
      date: now,
    },
    {
      title: "Order Confirmed",
      description:
        "Your order has been confirmed by Amruthahara.",
      completed: false,
      date: null,
    },
    {
      title: "Preparing",
      description:
        "Our team is preparing your fresh products.",
      completed: false,
      date: null,
    },
    {
      title: "Shipped",
      description:
        "Your order has been shipped.",
      completed: false,
      date: null,
    },
    {
      title: "Out Of Delivery",
      description:
        "Your order is out for delivery.",
      completed: false,
      date: null,
    },
    {
      title: "Delivered",
      description:
        "Your order has been delivered successfully.",
      completed: false,
      date: null,
    },
  ];
};

// =====================================================
// CREATE ORDER
// =====================================================

exports.createOrder = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      phonePeOrderId,
      phonePeTransactionId,
      paymentMethod,
      paymentStatus,
      amount,
      subtotal,
      deliveryCharge,
      currency,
      customer,
      address,
      items,
    } = req.body;

    console.log("======================================");
    console.log("CREATE ORDER REQUEST");
    console.log("CUSTOMER:", customer);
    console.log("AMOUNT:", amount);
    console.log(
      "ITEM COUNT:",
      Array.isArray(items) ? items.length : 0
    );
    console.log("======================================");

    // =================================================
    // AMOUNT
    // =================================================

    if (
      amount === undefined ||
      Number(amount) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    // =================================================
    // CUSTOMER
    // =================================================

    if (
      !customer ||
      typeof customer !== "object"
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer details are required",
      });
    }

    const hasAuthEmail =
      req.authRole === "customer" &&
      req.user &&
      String(req.user.email || "").trim() !== "";

    if (
      !hasAuthEmail &&
      (!customer.email ||
        String(customer.email).trim() === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer email is required",
      });
    }

    // =================================================
    // ADDRESS
    // =================================================

    if (
      !address ||
      typeof address !== "object"
    ) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    // =================================================
    // ITEMS
    // =================================================

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order must contain at least one item",
      });
    }

    // =================================================
    // NORMALIZE EMAIL
    // =================================================

    let customerEmail = String(customer.email || "")
      .trim()
      .toLowerCase();
    let ownerUserId = null;

    if (req.authRole === "customer" && req.user) {
      customerEmail = String(req.user.email || "")
        .trim()
        .toLowerCase();
      ownerUserId = req.user._id;
    }

    if (!customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer email is required",
      });
    }

    // =================================================
    // FORMAT ITEMS
    // =================================================

    const formattedItems = items.map((item) => ({
      productId:
        item.productId &&
        mongoose.Types.ObjectId.isValid(
          item.productId
        )
          ? item.productId
          : item._id &&
            mongoose.Types.ObjectId.isValid(
              item._id
            )
          ? item._id
          : null,

      name: item.name || "",

      price: Number(
        item.price || 0
      ),

      quantity: Number(
        item.quantity ??
          item.qty ??
          1
      ),

      image: item.image || "",

      isBowl: Boolean(item.isBowl),

      bowlIngredients: Array.isArray(item.bowlIngredients)
        ? item.bowlIngredients.map((ingredient) => ({
            name: ingredient.name || "",
            quantity: Number(ingredient.quantity || 1),
            price: Number(ingredient.price || 0),
            image: ingredient.image || "",
            category: ingredient.category || "",
          }))
        : [],
    }));

    // =================================================
    // CREATE ORDER
    // =================================================

    const newOrder = new Order({
      userId: ownerUserId,

      razorpayOrderId:
        razorpayOrderId || null,

      razorpayPaymentId:
        razorpayPaymentId || null,

      phonePeOrderId:
        phonePeOrderId || null,

      phonePeTransactionId:
        phonePeTransactionId || null,

      paymentMethod:
        paymentMethod || "COD",

      paymentStatus:
        paymentStatus || "Pending",

      amount: Number(amount),

      subtotal: Number(
        subtotal ?? amount
      ),

      deliveryCharge: Number(
        deliveryCharge ?? 0
      ),

      currency:
        currency || "INR",

      status: "Order Placed",

      customer: {
        name:
          customer.name || "",

        email:
          customerEmail,

        phone:
          customer.phone || "",
      },

      address: {
        name:
          address.name || "",

        phone:
          address.phone || "",

        addressLine:
          address.addressLine || "",

        city:
          address.city || "",

        state:
          address.state || "",

        pincode:
          address.pincode || "",
      },

      items:
        formattedItems,

      tracking:
        createTracking(),
    });

    // =================================================
    // SAVE
    // =================================================

    const savedOrder =
      await newOrder.save();

    console.log("======================================");
    console.log("ORDER CREATED SUCCESSFULLY");
    console.log("ORDER ID:", savedOrder._id);
    console.log(
      "CUSTOMER EMAIL:",
      savedOrder.customer.email
    );
    console.log("======================================");

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message:
        "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error(
      "CREATE ORDER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create order",
      error:
        error.message,
    });
  }
};

// =====================================================
// GET ALL ORDERS - ADMIN
// =====================================================

exports.getAllOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({})
        .sort({
          createdAt: -1,
        })
        .lean();

    return res.status(200).json({
      success: true,
      count:
        orders.length,
      orders,
    });
  } catch (error) {
    console.error(
      "GET ALL ORDERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch orders",
      error:
        error.message,
      orders: [],
    });
  }
};

// =====================================================
// GET USER ORDERS BY EMAIL
// GET /api/orders/user/:email
// =====================================================

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find(customerOrderFilter(req.user))
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
      orders: [],
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const requestedIdentity = decodeURIComponent(req.params.email || "")
      .trim()
      .toLowerCase();

    const authenticatedEmail = String(req.user.email || "")
      .trim()
      .toLowerCase();
    const authenticatedId = String(req.user._id).toLowerCase();

    if (
      requestedIdentity &&
      requestedIdentity !== authenticatedEmail &&
      requestedIdentity !== authenticatedId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own orders",
        orders: [],
      });
    }

    const orders = await Order.find(customerOrderFilter(req.user))
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET USER ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
      orders: [],
    });
  }
};

// =====================================================
// GET SINGLE ORDER
// =====================================================

exports.getOrderById = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    if (
      !id ||
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order ID",
      });
    }

    const order =
      await Order.findById(
        id
      ).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found",
      });
    }

    if (req.authRole === "admin") {
      return res.status(200).json({
        success: true,
        order,
      });
    }

    if (
      req.authRole === "customer" &&
      orderBelongsToCustomer(order, req.user)
    ) {
      return res.status(200).json({
        success: true,
        order,
      });
    }

    return res.status(403).json({
      success: false,
      message: "You can only view your own orders",
    });
  } catch (error) {
    console.error(
      "GET ORDER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch order",
      error:
        error.message,
    });
  }
};

// =====================================================
// UPDATE ORDER STATUS - ADMIN
// =====================================================

exports.updateOrderStatus =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      let { status } =
        req.body;

      console.log("======================================");
      console.log(
        "UPDATE ORDER STATUS"
      );
      console.log(
        "ORDER ID:",
        id
      );
      console.log(
        "RECEIVED STATUS:",
        status
      );
      console.log("======================================");

      // -------------------------------------------------
      // ORDER ID
      // -------------------------------------------------

      if (
        !id ||
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid order ID",
        });
      }

      // -------------------------------------------------
      // STATUS
      // -------------------------------------------------

      if (
        typeof status !==
        "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Order status is required",
        });
      }

      status =
        status.trim();

      // -------------------------------------------------
      // VALID STATUS
      // -------------------------------------------------

      if (
        !ORDER_STATUSES.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid order status",
          receivedStatus:
            status,
          allowedStatuses:
            ORDER_STATUSES,
        });
      }

      // -------------------------------------------------
      // FIND ORDER
      // -------------------------------------------------

      const order =
        await Order.findById(
          id
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      // -------------------------------------------------
      // UPDATE STATUS
      // -------------------------------------------------

      order.status =
        status;

      // -------------------------------------------------
      // CREATE TRACKING IF MISSING
      // -------------------------------------------------

      if (
        !Array.isArray(
          order.tracking
        ) ||
        order.tracking.length ===
          0
      ) {
        order.tracking =
          createTracking();
      }

      // -------------------------------------------------
      // CANCELLED
      // -------------------------------------------------

      if (
        status ===
        "Cancelled"
      ) {
        order.tracking.forEach(
          (step) => {
            if (
              step.title ===
              "Order Placed"
            ) {
              step.completed =
                true;

              step.date =
                step.date ||
                order.createdAt ||
                new Date();
            } else {
              step.completed =
                false;

              step.date =
                null;
            }
          }
        );
      }

      // -------------------------------------------------
      // NORMAL TRACKING
      // -------------------------------------------------

      else {
        const currentIndex =
          TRACKING_STATUSES.indexOf(
            status
          );

        order.tracking.forEach(
          (step) => {
            const stepIndex =
              TRACKING_STATUSES.indexOf(
                step.title
              );

            if (
              stepIndex !== -1 &&
              stepIndex <=
                currentIndex
            ) {
              step.completed =
                true;

              if (
                !step.date
              ) {
                step.date =
                  new Date();
              }
            } else {
              step.completed =
                false;

              step.date =
                null;
            }
          }
        );
      }

      // -------------------------------------------------
      // SAVE
      // -------------------------------------------------

      const updatedOrder =
        await order.save();

      console.log(
        "NEW ORDER STATUS:",
        updatedOrder.status
      );

      console.log(
        "ORDER SAVED:",
        updatedOrder._id
      );

      return res.status(200).json({
        success: true,
        message:
          "Order status updated successfully",
        order:
          updatedOrder,
      });
    } catch (error) {
      console.error(
        "UPDATE ORDER STATUS ERROR:",
        error
      );

      if (
        error.name ===
        "ValidationError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Order validation failed",
          error:
            error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Failed to update order status",
        error:
          error.message,
      });
    }
  };

// =====================================================
// UPDATE PAYMENT
// =====================================================

exports.updatePayment =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const {
        paymentStatus,
        razorpayPaymentId,
        phonePeTransactionId,
      } = req.body;

      // -------------------------------------------------
      // ORDER ID
      // -------------------------------------------------

      if (
        !id ||
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid order ID",
        });
      }

      // -------------------------------------------------
      // FIND ORDER
      // -------------------------------------------------

      const order =
        await Order.findById(
          id
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      if (req.authRole === "admin") {
        // Admin may update any payment record.
      } else if (
        req.authRole === "customer" &&
        orderBelongsToCustomer(order, req.user)
      ) {
        // Customer may update only their own payment record.
      } else {
        return res.status(403).json({
          success: false,
          message: "You can only update your own orders",
        });
      }

      // -------------------------------------------------
      // PAYMENT STATUS
      // -------------------------------------------------

      if (
        paymentStatus
      ) {
        order.paymentStatus =
          paymentStatus;
      }

      // -------------------------------------------------
      // RAZORPAY
      // -------------------------------------------------

      if (
        razorpayPaymentId
      ) {
        order.razorpayPaymentId =
          razorpayPaymentId;
      }

      // -------------------------------------------------
      // PHONEPE
      // -------------------------------------------------

      if (
        phonePeTransactionId
      ) {
        order.phonePeTransactionId =
          phonePeTransactionId;
      }

      // -------------------------------------------------
      // SAVE
      // -------------------------------------------------

      const updatedOrder =
        await order.save();

      return res.status(200).json({
        success: true,
        message:
          "Payment updated successfully",
        order:
          updatedOrder,
      });
    } catch (error) {
      console.error(
        "UPDATE PAYMENT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update payment",
        error:
          error.message,
      });
    }
  };

const toAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

const startOfDay = (date) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

const dayKey = (date) => {
  const next = new Date(date);
  const year = next.getFullYear();
  const month = String(next.getMonth() + 1).padStart(2, "0");
  const day = String(next.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const monthKey = (date) => {
  const next = new Date(date);
  const year = next.getFullYear();
  const month = String(next.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

exports.getSalesAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    const now = new Date();
    const today = startOfDay(now);
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startOfThisWeek = startOfDay(
      new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)
    );

    const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const last7Days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfThisWeek);
      date.setDate(startOfThisWeek.getDate() + index);
      return {
        key: dayKey(date),
        label: weekdayLabels[date.getDay()],
        date: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        orders: 0,
        income: 0,
      };
    });

    const last6Months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      return {
        key: monthKey(date),
        label: monthLabels[date.getMonth()],
        orders: 0,
        income: 0,
      };
    });

    const byStatus = {};
    const byPaymentMethod = {};
    const productMap = {};

    let grossSales = 0;
    let collectedIncome = 0;
    let pendingIncome = 0;
    let cancelledValue = 0;
    let activeOrders = 0;
    let cancelledOrders = 0;
    let paidOrders = 0;
    let thisMonthSales = 0;
    let lastMonthSales = 0;
    let todaySales = 0;
    let todayOrders = 0;

    orders.forEach((order) => {
      const amount = toAmount(order.amount ?? order.subtotal);
      const createdAt = order.createdAt ? new Date(order.createdAt) : now;
      const cancelled = order.status === "Cancelled";
      const paid = order.paymentStatus === "Paid";
      const status = order.status || "Order Placed";
      const method = order.paymentMethod || "COD";

      byStatus[status] = byStatus[status] || { count: 0, amount: 0 };
      byStatus[status].count += 1;
      byStatus[status].amount += amount;

      byPaymentMethod[method] = byPaymentMethod[method] || {
        count: 0,
        amount: 0,
      };
      byPaymentMethod[method].count += 1;
      byPaymentMethod[method].amount += amount;

      if (cancelled) {
        cancelledOrders += 1;
        cancelledValue += amount;
      } else {
        activeOrders += 1;
        grossSales += amount;

        if (paid) {
          paidOrders += 1;
          collectedIncome += amount;
        } else {
          pendingIncome += amount;
        }

        if (createdAt >= today) {
          todaySales += amount;
          todayOrders += 1;
        }

        if (createdAt >= startOfThisMonth) {
          thisMonthSales += amount;
        } else if (createdAt >= startOfLastMonth) {
          lastMonthSales += amount;
        }

        const day = last7Days.find((entry) => entry.key === dayKey(createdAt));
        if (day) {
          day.orders += 1;
          day.income += amount;
        }

        const month = last6Months.find(
          (entry) => entry.key === monthKey(createdAt)
        );
        if (month) {
          month.orders += 1;
          month.income += amount;
        }

        (order.items || []).forEach((item) => {
          const name = item.name || "Unnamed item";
          const quantity = toAmount(item.quantity) || 1;
          const lineTotal =
            toAmount(item.price) * quantity || amount;
          productMap[name] = productMap[name] || {
            name,
            quantity: 0,
            revenue: 0,
          };
          productMap[name].quantity += quantity;
          productMap[name].revenue += lineTotal;
        });
      }
    });

    const monthGrowth =
      lastMonthSales > 0
        ? ((thisMonthSales - lastMonthSales) / lastMonthSales) * 100
        : thisMonthSales > 0
          ? 100
          : 0;

    const topProducts = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6);

    const recentOrders = orders.slice(0, 8).map((order) => ({
      id: order._id,
      customer: order.customer?.name || order.address?.name || "Customer",
      amount: toAmount(order.amount ?? order.subtotal),
      status: order.status || "Order Placed",
      paymentStatus: order.paymentStatus || "Pending",
      createdAt: order.createdAt,
    }));

    return res.status(200).json({
      success: true,
      analytics: {
        totals: {
          orders: orders.length,
          activeOrders,
          cancelledOrders,
          paidOrders,
          grossSales,
          collectedIncome,
          pendingIncome,
          cancelledValue,
          averageOrder: activeOrders ? grossSales / activeOrders : 0,
          todaySales,
          todayOrders,
          thisMonthSales,
          lastMonthSales,
          monthGrowth,
        },
        last7Days,
        last6Months,
        byStatus,
        byPaymentMethod,
        topProducts,
        recentOrders,
      },
    });
  } catch (error) {
    console.error("GET SALES ANALYTICS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load sales analytics",
      error: error.message,
    });
  }
};
