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
  likes: [{ type: String }],
  views: [{ type: String }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: [
    {
      author: { type: String, required: true },
      content: { type: String, required: true },
      date: { type: Date, default: new Date() },
      likes: [{ type: String }],
    },
  ],
});

const PostProfile = mongoose.model("postSchema", postSchema);

export default PostProfile;
