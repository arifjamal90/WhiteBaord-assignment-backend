const mongoose = require("mongoose");

const StrokeSchema = new mongoose.Schema({
  points: [
    {
      x: Number,
      y: Number,
    },
  ],
  color: { type: String, required: true, default: "#000000" },
  size: { type: Number, required: true, default: 5 },
  type: { type: String, required: true, enum: ["solid", "dashed", "dotted"], default: "solid" },
});

const WhiteboardSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    strokes: [StrokeSchema], // Array of strokes
  },
  { timestamps: true }
);

module.exports = mongoose.model("Whiteboard", WhiteboardSchema);
