import jwt from "jsonwebtoken";
import UserProfile from "../models/user_profile.js";
import cookieParser from "cookie-parser";

export const generateAccessToken = (user, id) => {
  console.log(`generating access token for ${user}`);
  if (!user || !id) return;
  const access_token = jwt.sign(
    {
      userId: id,
      username: user,
    },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "15m" }
  );

  return access_token;
};

export const generateRefreshToken = (user, id) => {
  console.log(`generating refresh token for ${user}`);
  if (!user || !id) return;
  const payload = { username: user, id: id };
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "14d",
  });
  return refresh_token;
};

export const verifyAccessToken = async (req, res) => {
  // expecting input in req.body : { token : "asdfaasdvcsav"}
  const token = req.body.token;
  try {
    if (token) {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY,
        async function (err, decoded) {
          //genereate new pair of access token and refresh token
          if (decoded?.username) {
            //locate user in DB and save the new refresh token
            const current_user = await UserProfile.findOne({
              username: decoded.username,
            });
            //save refresh token in cookie
            saveUserAndCookie(req, res, current_user);
          }
          if (err) {
            console.log(err.message);
          }
        }
      );
    } else {
      verifyRefreshToken(req, res);
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyRefreshToken = async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return;
  console.log("refresh token: ", token);
  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_KEY,
    async function (err, decoded) {
      if (decoded) {
        //locate user in DB and save the new refresh token
        const current_user = await UserProfile.findOne({
          username: decoded.username,
        });
        if (!current_user) return;
        console.log("====saving user cookie====", current_user.username);
        //save refresh token in cookie
        saveUserAndCookie(req, res, current_user);
      } else {
        res.send("token expired");
      }
    }
  );
};

export const saveUserAndCookie = (req, res, current_user) => {
  console.log("current_user");
  if (!current_user.username) return;
  try {
    //Creating jwt token
    const access_token = generateAccessToken(
      current_user.username,
      current_user._id
    );
    //creating refresh token
    const refresh_token = generateRefreshToken(
      current_user.username,
      current_user._id
    );

    current_user.refreshToken = refresh_token;

    const _sendBack = {
      username: current_user.username,
      access_token: access_token,
      id: current_user._id,
      isLoggedIn: true,
      following: current_user.following,
      followers: current_user.followers,
      wrotePost: current_user.wrotePost,
      comments: current_user.comments,
    };

    res
      .cookie("jwt", refresh_token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        withCredentials: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200);
    res.send(_sendBack);

    current_user.save();
    console.log("====finish saving user cookie====", current_user.username);
    return _sendBack;
  } catch (error) {
    return error;
  }
};
