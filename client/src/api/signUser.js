import axios from "axios";
import { useDispatch } from "react-redux";
import { access_token } from "../slice/userSlice";

const baseURL = "http://localhost:5000";

export const signIn = async (user) => {
  axios.defaults.withCredentials = true;
  const url = baseURL + "/users/sign_in";

  const result = await axios
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
      return response.data.access_token;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
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

export const verifyAccessToken = async (token) => {
  axios.defaults.withCredentials = true;
  const url = baseURL + "/auth/access_token";
  try {
    const data = await axios
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

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

// export const verifyRefreshToken = (token) => {
//   axios.defaults.withCredentials = true;
//   const url = baseURL + "/users/auth/refresh_token";
//   if (token) {
//     axios
//       .post(
//         url,
//         {
//           token: token,
//         },
//         {
//           headers: {
//             "content-type": "application/json",
//           },
//         }
//       )
//       .then(function (response) {
//         return response;
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   } else {
//     console.log(token);
//   }
// };
