/**
 * - This file is the Schema for User Model.
 */

// Mongoose
const mongoose = require("mongoose");


// User Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      maxlength: [100, "First name can not exceed 100 characters"],
      minlength: [1, "First name can not be less than 1 character"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [100, "Last name can not exceed 100 characters"],
      minlength: [1, "Last name can not be less than 1 character"],
    },
    age: {
      type: Number,
      required: [true, "age is required"],
    },
    email: {
      type: String,
      unique: true
    },
    is_active: {
      type: Boolean,
      default: true
    }
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true
  }
);



// Create and export Client Model
const User = mongoose.model("User", userSchema);

module.exports = User;
