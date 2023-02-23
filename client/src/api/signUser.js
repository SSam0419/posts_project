import axios from "axios";

const baseURL = "http://localhost:5000";

export const userApi = () =>
  axios.create({
    baseURL: "http://localhost:5000/users",
  });

export const signIn = (user) => {
  axios.defaults.withCredentials = true;
  const url = baseURL + "/users/sign_in";
  if (user) {
    axios
      .post(
        url,
        {
          username: user.username,
          password: user.password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log(user);
  }
  console.log(user);
};

export const signUp = (user, setDuplicateUser, setSignIn) => {
  axios.defaults.withCredentials = true;
  const url = baseURL + "/users/sign_up";
  if (user) {
    axios
      .post(
        url,
        {
          username: user.username,
          password: user.password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        if (response.data === "username already registered. ")
          return setDuplicateUser(true);
        return setSignIn(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log(user);
  }
};

export const verifyAccessToken = (token) => {
  axios.defaults.withCredentials = true;
  const url = baseURL + "/users/auth/access_token";
  if (token) {
    axios
      .post(
        url,
        {
          token: token,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log(token);
  }
};

export const verifyRefreshToken = (token) => {
  axios.defaults.withCredentials = true;
  const url = baseURL + "/users/auth/refresh_token";
  if (token) {
    axios
      .post(
        url,
        {
          token: token,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log(token);
  }
};
