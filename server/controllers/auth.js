import jwt from "jsonwebtoken";

export const generateAccessToken = (user, id) => {
  const access_token = jwt.sign(
    {
      userId: id,
      username: user,
    },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "15s" }
  );

  return access_token;
};

export const generateRefreshToken = (user, id) => {
  const refresh_token = jwt.sign(
    {
      userId: id,
      username: user,
    },
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: "14d" }
  );

  return refresh_token;
};

export const verifyAccessToken = (req, res) => {
  console.log(`verifying ${req.body.token}`);
  const token = req.body.token;
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, function (err, decoded) {
      //genereate new pair of access token and refresh token
      if (decoded) {
        const user = decoded.username;
        const id = decoded.userId;
        const refresh_token = generateRefreshToken(user, id);
        const access_token = generateAccessToken(user, id);
        res.send(access_token);
        //locate user in DB and save the new refresh token
        //save refresh token in cookie
      } else {
        res.send("token expired");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyRefreshToken = (token) => {
  jwt.verify(token, process.env.REFRESH_TOKEN_KEY, function (err, decoded) {
    console.log(decoded);
  });
};

export const saveUserAndCookie = (req, res, current_user) => {
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
    res
      .cookie("jwt", refresh_token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        withCredentials: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .send({ access_token });

    current_user.save();

    return current_user;
  } catch (error) {
    return error;
  }
};
