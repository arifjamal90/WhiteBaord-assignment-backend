// routes/authRoutes.js
const express = require("express");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const { signup, signin, forgotPassword, changePassword, googleAuth,} = require("../controllers/auth");
const { sendOtp, sendotp } = require("../controllers/Otp");

const router = express.Router();

// Sign-up route
router.post('/signup', signup);

router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post('/changePassword/:token', changePassword);
router.post('/google', googleAuth);
router.post('/otp', sendotp);




module.exports = router;
