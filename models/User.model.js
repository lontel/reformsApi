const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    firstName: {
      type:String,
      trim:true,
      required: [true, 'First name is required.']
    },
    lastName: {
      type:String,
      trim:true,
      required: [true, 'Last name is required.']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema)

module.exports = User
