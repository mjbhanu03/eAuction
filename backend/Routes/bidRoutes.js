import express from "express";
import Bid from "../Models/Bid.js";
import BidLogs from "../Models/BidsLogs.js";
import upload from "../Middleware/bidMulter.js";
import multer, { MulterError } from "multer";

const router = express.Router();

// ====================
// GET ALL BIDS
// ====================
router.get("/", async (req, res) => {
  try {
    const data = await Bid.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching bids:", error);
    return res.status(500).json({ message: "Failed to fetch bids" });
  }
});

// ====================
// CREATE NEW BID
// ====================
router.post(
  "/create",
  upload.fields([
    { name: "document_type", maxCount: 10 },
    { name: "imageOne", maxCount: 1 },
    { name: "imageTwo", maxCount: 1 },
    { name: "imageThree", maxCount: 1 },
    { name: "imageFour", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        description,
        start_date,
        end_date,
        category_id,
        user_id,
        price,
      } = req.body;
      const files = req.files || {};

      // Collect all filenames
      const documentFiles =
        files["document_type"]?.map((f) => f.filename) || [];
      const imageOne = files["imageOne"]?.[0]?.filename || "";
      const imageTwo = files["imageTwo"]?.[0]?.filename || "";
      const imageThree = files["imageThree"]?.[0]?.filename || "";
      const imageFour = files["imageFour"]?.[0]?.filename || "";

      // Create new bid entry
      await Bid.create({
        title,
        description,
        status: "Requested",
        start_date,
        end_date,
        category_id,
        user_id,
        image1_url: files["imageOne"]?.[0]?.filename || "",
        image2_url: files["imageTwo"]?.[0]?.filename || "",
        image3_url: files["imageThree"]?.[0]?.filename || "",
        image4_url: files["imageFour"]?.[0]?.filename || "",
        price,
        docs: JSON.stringify(documentFiles)
      });

      return res.status(201).json({ message: "Bid created successfully!" });
    } catch (error) {
      console.error("Error creating bid:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
);

// ====================
// MULTER ERROR HANDLER
// ====================
router.use((err, req, res, next) => {
  if (
    err instanceof MulterError ||
    (err.message && err.message.includes("Only"))
  ) {
    console.error("Multer error:", err.message);
    return res.status(400).json({ message: err.message });
  }

  console.error("Unhandled error:", err);
  return res
    .status(500)
    .json({ message: "Unexpected server error", error: err.message });
});

router.post("/placeBid", async (req, res) => {
  try {
    const { bid_id, user_id, price } = req.body;

    // Log bid in BidLogs table
    await BidLogs.create({
      bid_id,
      user_id,
      price: price
    });

    return res.status(200).json({
      message: "Bid placed successfully!",
      current_price: price,
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

router.get('/fetchAllBidsLogs/:id', async (req, res) => {
  const bidId = req.params.id;

  try {
    const data = await BidLogs.findAll({
      where: { bid_id: bidId },
      order: [['price', 'DESC']], // optional: latest first
    });

    res.json(data);
  } catch (err) {
    console.error("Error fetching bid logs:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
