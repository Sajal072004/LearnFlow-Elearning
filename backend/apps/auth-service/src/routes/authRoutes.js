// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const validateInput = require("../middlewares/validateInput");
const { signup, login } = require("../controllers/authController");

router.post(
  "/register",
  validateInput(["name", "email", "password", "role"]),
  signup
);
router.post("/login", validateInput(["email", "password"]), login);

module.exports = router;
