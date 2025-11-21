import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import bidRoutes from "./Routes/bidRoutes.js";
import userPayment from "./Routes/userPaymentsRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
import adminRoutes from "./Admin/Routes/adminRoutes.js";

dotenv.config({ override: true });


// Initialize express app
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.resolve();

// Put this near top of your server file (after express app created, before any routes)
app.use((req, res, next) => {
  // Remove any existing CSP header to avoid overly strict defaults
  res.removeHeader("Content-Security-Policy");

  // Set a permissive CSP for PayPal in dev. Adjust for production later.
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' data: blob:; " +
    "script-src 'self' https://www.paypal.com 'unsafe-inline' 'unsafe-eval'; " +
    "connect-src 'self' https://www.paypal.com https://api-m.sandbox.paypal.com https://api-m.paypal.com; " +
    "frame-src https://www.paypal.com https://www.sandbox.paypal.com; " +
    "img-src 'self' data: blob: https:; " +
    "style-src 'self' 'unsafe-inline' https:;"
  );
  next();
});


// Serve static profile images from the backend's Photos/Profile folder
app.use("/photos/profile", express.static(path.join(__dirname, "Photos")));
app.use(
  "/photos/bidsphotos",
  express.static(path.join(__dirname, "Photos/Bids"))
);

app.use("/photos", express.static(path.join(__dirname, "Photos")));

// Use your auth routes
app.use("/auth", authRoutes);

// Bid Routes
app.use("/bid", bidRoutes);

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Admin side Routes
app.use("/admin", adminRoutes);

// user Payments for Bid
app.use("/userPaymentsForBid", userPayment);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
