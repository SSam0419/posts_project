import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  verified: { type: Boolean, default: false },
  refreshToken: { type: String, default: "" },
  followers: [String],
  following: [String],
  wrotePost: [String],
  comments: [
    {
      author: { type: String, required: true },
      content: { type: String, required: true },
      date: { type: Date, default: new Date() },
    },
  ],
});

const UserProfile = mongoose.model("UserProfile", userSchema);

export default UserProfile;
