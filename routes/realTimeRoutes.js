const express = require("express");
const { save, load } = require("../controllers/realTimeCol");

const router = express.Router();

// Save drawings
router.post("/save", save);

// Load drawings
router.get("/load", load);

module.exports = router;
