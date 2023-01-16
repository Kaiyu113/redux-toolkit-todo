const mongoose = require("mongoose");
const todoSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    value: {
      type: String,
      required: true,
    },
    iscompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todo", todoSchema);
