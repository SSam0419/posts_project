import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  verified: { type: Boolean, default: false },
  refreshToken: { type: String, default: "" },
});

const UserProfile = mongoose.model("UserProfile", userSchema);

export default UserProfile;
