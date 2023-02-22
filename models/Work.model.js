const { Schema, model } = require("mongoose")

const workSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true
    },
     category: {
        required: true,
        type: String
    },
    description: {
        required: [true, 'You need a description'],
        type: String,
        maxlength: 1000
    },
     images: {
        type: Array,
        default: []
    }
  },
  {
    timestamps: true
  }
);

const Work = model("Work", workSchema)

module.exports = Work
