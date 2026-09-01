const mongoose = require("mongoose");
const Subscription = require("../models/Subscription");

const ALLOWED_PLANS = ["daily", "weekly", "monthly"];
const ALLOWED_STATUSES = ["pending", "approved", "declined"];

const publicError = (res, status, message) =>
  res.status(status).json({
    success: false,
    message,
  });

const formatSubscription = (doc) => {
  if (!doc) {
    return null;
  }

  const item = doc.toObject ? doc.toObject() : doc;

  return {
    _id: item._id,
    userId: item.userId,
    name: item.name,
    email: item.email,
    phone: item.phone,
    plan: item.plan,
    days: item.days,
    notes: item.notes || "",
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

const normalizePhone = (value) => String(value || "").trim();

const isValidPhone = (value) => {
  const digits = normalizePhone(value).replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
};

exports.createSubscription = async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const phone = normalizePhone(req.body.phone);
    const plan = String(req.body.plan || "")
      .trim()
      .toLowerCase();
    const days = Number(req.body.days);
    const notes = String(req.body.notes || "").trim();

    if (!name) {
      return publicError(res, 400, "Full name is required");
    }

    if (!phone || !isValidPhone(phone)) {
      return publicError(res, 400, "Enter a valid phone number");
    }

    if (!ALLOWED_PLANS.includes(plan)) {
      return publicError(res, 400, "Select a valid subscription plan");
    }

    if (!Number.isInteger(days) || days < 1) {
      return publicError(res, 400, "Enter a valid number of days (minimum 1)");
    }

    const subscription = await Subscription.create({
      userId: req.user._id,
      name,
      email: String(req.user.email || "").trim().toLowerCase(),
      phone,
      plan,
      days,
      notes,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Subscription request submitted successfully",
      subscription: formatSubscription(subscription),
    });
  } catch (error) {
    console.error("CREATE SUBSCRIPTION ERROR:", error);
    return publicError(
      res,
      500,
      "Unable to submit subscription request. Please try again."
    );
  }
};

exports.getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      subscription: formatSubscription(subscriptions[0]) || null,
      subscriptions: subscriptions.map(formatSubscription),
    });
  } catch (error) {
    console.error("GET MY SUBSCRIPTIONS ERROR:", error);
    return publicError(
      res,
      500,
      "Unable to load your subscription. Please try again."
    );
  }
};

exports.getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return publicError(res, 400, "Invalid user");
    }

    if (String(req.user._id) !== String(userId)) {
      return publicError(res, 403, "You can only view your own subscription");
    }

    const subscriptions = await Subscription.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      subscription: formatSubscription(subscriptions[0]) || null,
      subscriptions: subscriptions.map(formatSubscription),
    });
  } catch (error) {
    console.error("GET USER SUBSCRIPTIONS ERROR:", error);
    return publicError(
      res,
      500,
      "Unable to load subscription. Please try again."
    );
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      subscriptions: subscriptions.map(formatSubscription),
    });
  } catch (error) {
    console.error("GET ALL SUBSCRIPTIONS ERROR:", error);
    return publicError(
      res,
      500,
      "Unable to load subscription requests."
    );
  }
};

exports.updateSubscriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = String(req.body.status || "")
      .trim()
      .toLowerCase();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return publicError(res, 404, "Subscription not found");
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return publicError(res, 400, "Invalid subscription status");
    }

    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return publicError(res, 404, "Subscription not found");
    }

    return res.status(200).json({
      success: true,
      message: "Subscription status updated",
      subscription: formatSubscription(subscription),
    });
  } catch (error) {
    console.error("UPDATE SUBSCRIPTION STATUS ERROR:", error);
    return publicError(
      res,
      500,
      "Unable to update subscription status."
    );
  }
};

