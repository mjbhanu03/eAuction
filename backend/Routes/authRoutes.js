import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import upload from "../Middleware/multer.js";
import getCitiesWithHierarchy from "../Models/Address.js";
// import db from "../Config/db";

const router = express.Router();

// REGISTER USER
router.post("/register", upload.single("document_type"), async (req, res) => {
  try {
    const { name, surname, number, email, password, city_id } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      surname,
      number,
      status: "Requested",
      email,
      password: hashedPassword,
      city_id: parseInt(city_id, 10),
      document_type: req.file?.filename || "", // Save file name in DB
    });

    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
  console.error("Backend Error:", error.stack || error.message || error);
  return res.status(500).json({ message: "Server error", error: error.message });
}
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Sorry, server error" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// GET PROFILE (Protected Route)
router.get("/profile/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Fetch user profile data
    const user = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Fetch cities and hierarchical data
    const citiesWithHierarchy = await getCitiesWithHierarchy(user.city_id);

    // Map the result to a user profile with city details
    const userProfile = {
      ...user.dataValues,
      city_id: citiesWithHierarchy || {}
    };

    // Send the response
    res.json({ success: true, user: userProfile });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ success: false, message: "Failed to load profile." });
  }
});

// GET ALL USERS (For Admin or Debug)
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/cities", async (req, res) => {
  try {
    const cities = await getCitiesWithHierarchy();
    res.json(cities);
  } catch (error) {
    // res.status(404).json({ message: "Internal Server Error" });
    console.log(error)
  }
});

export default router;
