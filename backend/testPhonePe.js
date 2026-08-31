require("dotenv").config();

console.log("PhonePe Configuration Check");
console.log("--------------------------------");

console.log(
  "Client ID:",
  process.env.PHONEPE_CLIENT_ID ? "✅ Loaded" : "❌ Missing"
);

console.log(
  "Client Version:",
  process.env.PHONEPE_CLIENT_VERSION
    ? "✅ Loaded"
    : "❌ Missing"
);

console.log(
  "Client Secret:",
  process.env.PHONEPE_CLIENT_SECRET
    ? "✅ Loaded"
    : "❌ Missing"
);