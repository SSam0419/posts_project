import exrpess from "express";
import {
  addComment,
  createPost,
  dislikePost,
  getAllPosts,
  getManyPostsById,
  getPostById,
  likePost,
  viewPost,
} from "../controllers/post.js";

const router = exrpess.Router();

router.get("/", (req, res) => {
  res.send("Getting post route...");
});
router.post("/get_posts_with_limit", getAllPosts);
router.post("/get_post_by_id", getPostById);
router.post("/get_many_posts_by_id", getManyPostsById);
router.post("/create_post", createPost);
router.post("/create_comment", addComment);
router.post("/like_post", likePost);
router.post("/dislike_post", dislikePost);
router.post("/view_post", viewPost);

export default router;
