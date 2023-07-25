const mongoose = require("mongoose");
const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name must be provied"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Position must be provied"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Jobs", jobSchema);
