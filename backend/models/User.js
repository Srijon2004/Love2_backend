// const mongoose = require("mongoose");

// const girlfriendSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   photo: {
//     type: String, // can be URL (Cloudinary, S3, etc.) or base64
//     default: "",
//   },
//   details: {
//     type: String,
//     default: "",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true,  trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true },
//     girlfriends: {
//       type: [girlfriendSchema],
//       default: [], // initially no girlfriend details
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);
















const mongoose = require("mongoose");

const girlfriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String, // URL (Cloudinary, S3, etc.) or base64
    default: "",
  },
  details: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // optional for Google login
    firebaseUID: { type: String, unique: true, sparse: true }, // store Firebase UID
    girlfriends: {
      type: [girlfriendSchema],
      default: [], // initially no girlfriend details
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
