const mongoose = require("mongoose");
const todoSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    value: {
      type: String,
    },
    iscompleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todo", todoSchema);
