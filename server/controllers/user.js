import UserProfile from "../models/user_profile.js";
import bcrypt from "bcrypt";
import { saveUserAndCookie } from "./auth.js";

export const sign_in = async (req, res) => {
  const { username, password } = req.body;
  console.log(`${username} is signing in ... `);
  try {
    const current_user = await UserProfile.findOne({
      username: username,
    });
    if (!current_user) {
      console.log("username not exist. ");
      return res.status(400).send("wrong username"); //wrong username
    } else {
      const is_password_correct = await bcrypt.compare(
        password,
        current_user.password
      );

      if (is_password_correct) {
        try {
          //save refresh token to DB
          const r = saveUserAndCookie(req, res, current_user);
          console.log(r);
        } catch (err) {
          console.log(err);
          const error = new Error("Error! Something went wrong.");
          return next(error);
        }
      } else {
        return res.status(400).send("wrong password"); //wrong password
      }
    }
  } catch (error) {
    console.log(error);
    return res.send("Fail to log in :", error);
  }
};

export const sign_up = async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  try {
    const current_user = await UserProfile.find({ username: username });
    if (current_user.length > 0) {
      console.log("username already registered. ");
      return res.send("username already registered. ");
    } else {
      const hash_password = await bcrypt.hash(password, saltRounds);

      new UserProfile({
        username: username,
        password: hash_password,
      })
        .save()
        .then(() => {
          console.log(`user ${username} added`);
          res.send(`user ${username} added`);
        })
        .catch((error) => console.log(error.message));
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    const { username } = req.query;
    console.log(`user : ${username} is logging out ... `);
    const current_user = await UserProfile.findOne({
      username: username,
    });
    if (current_user) {
      current_user.refreshToken = "";
      current_user.save();
    }
    //clear cookie
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.send(`user : ${username} is logging out ... `);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
