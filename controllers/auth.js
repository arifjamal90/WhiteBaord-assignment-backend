const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Token = require("../models/Token");
const { OAuth2Client } = require("google-auth-library");

const { mailTemp } = require("../mail/mailTemp");
const { mailSender } = require("../Utils/mailSender");


exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Validate role
    const allowedRoles = ["Admin", "Editor", "Viewer"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }
console.log(allowedRoles,"allowedRoles");

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the plain password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username: name, email, password: hashedPassword,  role, });
    await user.save();

    // Generate a JWT token
    const payload = { id: user._id, name: user.name, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
     
    });
    console.log({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// Signin Route
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, name: user.username, role:user.role , email:user.email},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




//  forgot password------------------------------
exports.forgotPassword = async (req, res) => {
  try {
    console.log("Forgot Password API Hit!"); 

    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email field is required." });
    }

    const user = await User.findOne({ email: email });
    console.log("User found:", user);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const generateToken = crypto.randomBytes(32).toString("hex");
    console.log("Generated token:", generateToken);

    const url = `http://localhost:3000/reset-password/${generateToken}`;
    console.log("Reset URL:", url);

    const token = new Token({
      userId: user._id,
      token: generateToken,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    });
    await token.save();

    console.log("Token saved successfully");

    await mailSender(email, "Forgot Password", mailTemp(url));

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      url,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Email not sent, please try again." });
  }
};

// change password

exports.changePassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const generateToken = await Token.findOne({ token });

    if (!generateToken) {
      return res.status(404).json({
        message: " token expire",
        success: false,
      });
    }

    if (Date.now() > generateToken.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Token expired",
      });
    }

    const user = await User.findById(generateToken.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    await generateToken.deleteOne();

    res.json({
      success: true,
      message: "Password change successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Password not change Please try again.",
    });
  }
};


const CLIENT_ID = "277473852381-qecds9q3dodoo3viqehnsp29hkuea4n6.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

exports.googleAuth = async (req, res) => {
  try {
      const { token } = req.body;
      console.log(token)
      if (!token) {
          return res.status(400).json({ success: false, message: "No token provided" });
      }

      // Verify Google Token
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
          return res.status(400).json({ success: false, message: "Invalid Google token" });
      }

      // Check if user exists in the database
      let user = await User.findOne({ email: payload.email });

      if (!user) {
          // // Create a new user
          // // Create an associated Profile for the user
          // const profile = new User({
          //   email: payload.email,
          //   username: payload.name,
          //   role: "Admin"
          // });

          // await profile.save();

          // Create a new User record
          user = new User({
              email: payload.email,
              username: payload.name,
              role: "Admin"
          });

          await user.save();
      }

      // Generate JWT Token
      const jwtpayload = {
          email: user.email,
          id: user._id,
          role: user.role
      }
      const jwttoken = jwt.sign(jwtpayload, process.env.JWT_SECRET, {
          expiresIn: "24h"
      });
      user.token = token;
      user.password = undefined;

      // create cookie and send request 
      const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      };
      res.cookie("token", jwttoken, options).status(200).json({
          success: true,
          message: "Logged in successfully",
          user,
          token,
      });

  } catch (error) {
      console.error("Google Authentication Error:", error);
      return res.status(500).json({
          success: false,
          message: "Google authentication failed",
          error: error.message,
      });
  }
};
