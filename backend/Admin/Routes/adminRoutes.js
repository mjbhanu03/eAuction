import express from "express";

/* ----------------------------- ADMIN CONTROLLERS ----------------------------- */
import {
  addAdmin,
  getAllAdmins,
  updateAdminProfile,
  getAdminProfile,
  updateAdmin,
  getAdminById,
  deleteAdmin
} from "../Controller/adminController.js";

import { loginAdmin } from "../Controller/authController.js";

/* ----------------------------- USER CONTROLLERS ------------------------------ */
import {
  getAllUsers,
  getUserById,
  getRequestedUsers,
  updateUserStatus,
  getApprovedUsers,
  blockUser
} from "../Controller/userController.js";

/* ----------------------------- BID CONTROLLERS ------------------------------- */
import {
  getRequestedBids,
  approveBid,
  rejectBid,
  getBidDetailsWithBidders,
} from "../Controller/bidController.js";

import {
  getActiveBids,
  getActiveBidById,
} from "../Controller/activeBidController.js";

/* --------------------------- WINNER CONTROLLERS ------------------------------ */
import {
  getAllWinners,
  getWinnerById,
  markWinnerPaid,
} from "../Controller/winnerController.js";

/* ------------------------- BID HISTORY CONTROLLERS --------------------------- */
import {
  getCompletedBids,
  getBidLogsByBidId,
  getBidLogsWithUsers
} from "../Controller/bidHistoryController.js";

/* --------------------------- PAYMENT CONTROLLERS ----------------------------- */
import { getAllPaymentsByBid } from "../Controller/paymentController.js";

/* -------------------------- DASHBOARD CONTROLLERS ---------------------------- */
import { getDashboardStats } from "../Controller/dashboardController.js";

/* ----------------------- BROKER PAYMENT (FETCH ONLY) ------------------------- */
import {
  getAllBrokerPayments,
  getBrokerPaymentById,
  approveBrokerPayment
} from "../Controller/brokerPaymentController.js";


/* --------------------------------------------------------------------------- */

const router = express.Router();

/* -------------------------------- ADMIN -------------------------------- */
router.post("/add-admin", addAdmin);
router.post("/login", loginAdmin);
router.get("/get-all-admins", getAllAdmins);
router.get("/profile/:id", getAdminProfile);
router.put("/update-admin/:id", updateAdminProfile);
router.get("/admin/:id", getAdminById);
router.put("/admin/update/:id", updateAdmin);
router.delete("/delete-admin/:id", deleteAdmin);
router.put("/user/block/:id", blockUser);

/* -------------------------------- USERS -------------------------------- */
router.get("/requested-users", getRequestedUsers);
router.put("/user/status/:id", updateUserStatus);
router.get("/user/all", getAllUsers);
router.get("/user/:id", getUserById);
router.get("/approved-users", getApprovedUsers);

/* -------------------------------- BIDS -------------------------------- */
router.get("/requested-bids", getRequestedBids);
router.put("/approve-bid/:id", approveBid);
router.put("/reject-bid/:id", rejectBid);

/* ------------------------------ ACTIVE BIDS ---------------------------- */
router.get("/active-bids", getActiveBids);
router.get("/active-bids/:id", getActiveBidById);

/* ------------------------------- DETAILS -------------------------------- */
router.get("/bids/:id", getBidDetailsWithBidders);

/* ------------------------------- WINNERS -------------------------------- */
router.get("/winner-bids", getAllWinners);
router.get("/winner-bids/:id", getWinnerById);
router.post("/winner-bids/:id/mark-paid", markWinnerPaid);

/* --------------------------- BID HISTORY -------------------------------- */
router.get("/bid-history", getCompletedBids);
router.get("/bid-history/:bidId", getBidLogsByBidId);
router.get("/bid-history/:bidId/logs", getBidLogsWithUsers);

/* ------------------------------ PAYMENTS -------------------------------- */
router.get("/entry-payments", getAllPaymentsByBid);

/* ------------------------------ DASHBOARD ------------------------------- */
router.get("/dashboard-stats", getDashboardStats);

/* ------------------------- BROKER PAYMENTS (FETCH) ----------------------- */
// ✔ Only fetch, no insert/update, no mark-paid
router.get("/broker-payments", getAllBrokerPayments);
router.get("/broker-payments/:id", getBrokerPaymentById);

/* ------------------------------------------------------------------------ */
router.post("/broker-payments/:bidId/approve", approveBrokerPayment);

export default router;
