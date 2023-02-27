import exrpess from "express";
import { createPost, getAllPosts, getPostById } from "../controllers/post.js";

const router = exrpess.Router();

router.get("/", (req, res) => {
  res.send("Getting post route...");
});
router.get("/get_all_posts", getAllPosts);
router.post("/get_post_by_id", getPostById);
router.post("/create_post", createPost);

export default router;
