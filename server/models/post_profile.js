import mongoose from "mongoose";
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  likes: [String],
  views: [String],
  saved: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: [
    {
      author: { type: String, required: true },
      content: { type: String, required: true },
      date: { type: Date, default: new Date() },
      likes: [String],
    },
  ],
  category: { type: String, required: true },
});

const PostProfile = mongoose.model("postSchema", postSchema);

export default PostProfile;
