import exrpess from "express";
import cookieParser from "cookie-parser";

import { verifyAccessToken, verifyRefreshToken } from "../controllers/auth.js";

const router = exrpess.Router();

router.get("/", (req, res) => {
  res.send("Getting auth route...");
  console.log("this : ", req.cookies.jwt);
});

router.post("/", (req, res) => {
  res.send("Posting auth route...");
  console.log(req.cookies?.jwt);
  console.log(req.cookies?.foo);
});

router.post("/refresh_token", verifyRefreshToken);

router.post("/access_token", verifyAccessToken);

export default router;
