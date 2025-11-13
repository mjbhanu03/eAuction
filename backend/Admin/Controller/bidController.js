import Bid from "../Models/Bid.js";
import User from "../Models/User.js";
import Category from "../Models/Category.js";

import BidsLog from "../Models/BidsLog.js";

// Get all requested bids
export const getRequestedBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({
      where: { status: "Requested" },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "number"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"], // ✅ fetch category name
        },
      ],
    });

    res.status(200).json({ success: true, data: bids });
  } catch (error) {
    console.error("Error fetching requested bids:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Approve Bid
export const approveBid = async (req, res) => {
  try {
    const { id } = req.params;
    const bid = await Bid.findByPk(id);
    if (!bid) {
      return res.status(404).json({ success: false, message: "Bid not found" });
    }

    bid.status = "Active";
    await bid.save();

    res.json({ success: true, message: "Bid approved successfully", bid });
  } catch (error) {
    console.error("Error approving bid:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ❌ Reject Bid
export const rejectBid = async (req, res) => {
  try {
    const { id } = req.params;
    const bid = await Bid.findByPk(id);
    if (!bid) {
      return res.status(404).json({ success: false, message: "Bid not found" });
    }

    bid.status = "Rejected";
    await bid.save();

    res.json({ success: true, message: "Bid rejected successfully", bid });
  } catch (error) {
    console.error("Error rejecting bid:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// ✅ Get all users who placed bids on a particular product (bid)
export const getBidDetailsWithBidders = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find the Bid
    const bid = await Bid.findOne({
      where: { id },
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email", "number"] },
        { model: Category, as: "category", attributes: ["id", "name"] }
      ]
    });

    if (!bid)
      return res.status(404).json({ success: false, message: "Bid not found" });

    // 2️⃣ Find all Bidders from bids_logs table
    const bidders = await BidsLog.findAll({
      where: { bid_id: id },
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email", "number"] }
      ],
      order: [["price", "DESC"]] // sort by highest bid first
    });

    // 3️⃣ Send Response
    res.status(200).json({
      success: true,
      bid,
      bidders
    });
  } catch (error) {
    console.error("Error fetching bid details:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};