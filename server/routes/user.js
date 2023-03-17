import exrpess from "express";
import {
  followUser,
  logout,
  sign_in,
  sign_up,
  visitUser,
  addProfileComment,
} from "../controllers/user.js";
import { verifyAccessToken, verifyRefreshToken } from "../controllers/auth.js";

const router = exrpess.Router();

router.get("/", (req, res) => {
  res.send("Getting users route...");
});

router.post("/sign_in", sign_in);
router.post("/sign_up", sign_up);

router.post("/follow_user", followUser);
router.get("/visit_user_profile/:userId", visitUser);

router.delete("/logout/:username", logout);

router.post("/addProfileComment", addProfileComment);

export default router;
