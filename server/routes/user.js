import exrpess from "express";
import { logout, sign_in, sign_up } from "../controllers/user.js";
import { verifyAccessToken, verifyRefreshToken } from "../controllers/auth.js";

const router = exrpess.Router();

router.get("/", (req, res) => {
  res.send("Getting users route...");
});

router.post("/sign_in", sign_in);

router.post("/sign_up", sign_up);

router.delete("/logout", logout);

router.post("/auth/access_token", verifyAccessToken);
router.post("/auth/refresh_token", verifyRefreshToken);

// router.post("/token", auth);

export default router;
