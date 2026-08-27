require("dotenv").config();

const {
  StandardCheckoutClient,
  StandardCheckoutPayRequest,
  Env,
} = require("@phonepe-pg/pg-sdk-node");

const clientId =
  process.env.PHONEPE_CLIENT_ID;

const clientSecret =
  process.env.PHONEPE_CLIENT_SECRET;

const clientVersion = Number(
  process.env.PHONEPE_CLIENT_VERSION
);

const environment =
  process.env.PHONEPE_ENVIRONMENT ===
  "PRODUCTION"
    ? Env.PRODUCTION
    : Env.SANDBOX;

console.log(
  "\n======================================"
);

console.log(
  "PhonePe Configuration Check"
);

console.log(
  "======================================"
);

console.log(
  "Client ID:",
  clientId ? "✅ Loaded" : "❌ Missing"
);

console.log(
  "Client Version:",
  clientVersion
    ? "✅ Loaded"
    : "❌ Missing"
);

console.log(
  "Client Secret:",
  clientSecret
    ? "✅ Loaded"
    : "❌ Missing"
);

console.log(
  "Environment:",
  process.env.PHONEPE_ENVIRONMENT ||
    "SANDBOX"
);

console.log(
  "======================================\n"
);

if (
  !clientId ||
  !clientSecret ||
  !clientVersion
) {
  throw new Error(
    "PhonePe environment variables are missing"
  );
}

const client =
  StandardCheckoutClient.getInstance(
    clientId,
    clientSecret,
    clientVersion,
    environment
  );

module.exports = {
  client,
  StandardCheckoutPayRequest,
  Env,
};