// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json({ limit: "5mb" })); // allow base64 images
// app.use(cookieParser());
// app.use(cors({ origin: true, credentials: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));




























// ...........................
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const admin = require("firebase-admin");

// // Add your service account key
// // const serviceAccount = require("./serviceAccountKey.json");

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// // });

// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json({ limit: "5mb" }));
// app.use(cookieParser());
// // app.use(cors({ origin: true, credentials: true }));
// const allowedOrigins = [
//   'http://localhost:5173',                 // Your local frontend for development
//   'https://love-srijon.onrender.com',
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/v1/auth", authRoutes);
// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));



















require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");

// Add your service account key
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
// app.use("/uploads", express.static("uploads"));
const allowedOrigins = [
  'http://localhost:5173',                 // Your local frontend for development
  'https://love-srijon.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));