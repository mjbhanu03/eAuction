import express from "express";
import {
  addAdmin,
  getAllAdmins,
  updateAdminProfile,
  getAdminProfile,
  updateAdmin,
  getAdminById,
} from "../Controller/adminController.js";

import { loginAdmin } from "../Controller/authController.js";

import {
  getAllUsers,
  getUserById,
  getRequestedUsers,
  updateUserStatus,
  getApprovedUsers,
  blockUser
} from "../Controller/userController.js";

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

import {
  getAllWinners,
  getWinnerById,
  markWinnerPaid,
} from "../Controller/winnerController.js";

import { getCompletedBids, getBidLogsByBidId,getBidLogsWithUsers } from "../Controller/bidHistoryController.js";

import { getAllPaymentsByBid } from "../Controller/paymentController.js";


const router = express.Router();

// 🔹 Admin routes
router.post("/add-admin", addAdmin);
router.post("/login", loginAdmin);
router.get("/get-all-admins", getAllAdmins);
router.get("/profile/:id", getAdminProfile);
router.put("/update-admin/:id", updateAdminProfile);
router.get("/admin/:id", getAdminById);
router.put("/admin/update/:id", updateAdmin);
router.put("/user/block/:id", blockUser);

// 🔹 User routes
router.get("/requested-users", getRequestedUsers);
router.put("/user/status/:id", updateUserStatus);
router.get("/user/all", getAllUsers);
router.get("/user/:id", getUserById);
router.get("/approved-users", getApprovedUsers);

// 🔹 Bid routes
router.get("/requested-bids", getRequestedBids);
router.put("/approve-bid/:id", approveBid);
router.put("/reject-bid/:id", rejectBid);

// ✅ Active bids routes
router.get("/active-bids", getActiveBids);
router.get("/active-bids/:id", getActiveBidById);

// ✅ Bid details route
router.get("/bids/:id", getBidDetailsWithBidders);

// ✅ Winner routes (added now)
router.get("/winner-bids", getAllWinners);
router.get("/winner-bids/:id", getWinnerById);
router.post("/winner-bids/:id/mark-paid", markWinnerPaid);

router.get("/bid-history", getCompletedBids); // ✅ fetch all winners
router.get("/bid-history/:bidId", getBidLogsByBidId); // ✅ optional, get by bid ID
router.get("/bid-history/:bidId/logs", getBidLogsWithUsers);

router.get("/entry-payments", getAllPaymentsByBid);


export default router;
