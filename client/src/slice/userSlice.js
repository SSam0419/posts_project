import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000";

export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ fromThisUser, toThatUser }) => {
    const url = baseURL + "/users/follow_user";
    const result = await axios
      .psot(url, {
        headers: {
          "content-type": "application/json",
        },
        body: { fromThisUser, toThatUser },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.code);
      });

    return result;
  }
);

export const visitUser = createAsyncThunk("user/visitUser", async (userId) => {
  axios.defaults.withCredentials = true;
  const url = baseURL + "/users/visit_user_profile/" + userId;

  const result = await axios
    .get(url, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then(function (response) {
      if (response.status == "404") {
        return "no user found";
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error.code);
      return error.response.data;
    });

  return result;
});

export const signIn = createAsyncThunk("user/signIn", async (user) => {
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
      if (response.status == "400") {
        return "wrong username";
      }
      if (response.status == "401") {
        return "wrong password";
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error.code);
      return error.response.data;
    });

  return result;
});

export const signUp = createAsyncThunk("user/signUp", async (user) => {
  const url = baseURL + "/users/sign_up";
  try {
    const result = await axios.post(
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
    );
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const logout = createAsyncThunk("user/logout", async (username) => {
  axios.defaults.withCredentials = true;
  const url = baseURL + "/users/logout/" + username;
  try {
    const result = await axios
      .delete(url)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error.code);
        return error.response.data;
      });
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const addProfileComment = createAsyncThunk(
  "user/addUserComment",
  async ({ username, comment }) => {
    const url = baseURL + "/users/addProfileComment";
    try {
      const result = await axios.post(
        url,
        {
          username: username,
          comment: comment,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  userProfile: {
    username: "",
    access_token: "",
    id: "",
    isLoggedIn: false,
    following: [],
    followers: [],
    wrotePost: [],
    comments: [],
  },
  status: "idle",
  error: null,
  visitingUserStatus: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    access_token: (state, action) => {
      state.userProfile.access_token = action.payload;
    },
    setUserProfile: (state, action) => {
      state.status = "succeeded";
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    pushProfileComment: (state, action) => {
      state.userProfile = {
        ...state.userProfile,
        comments: [action.payload, ...state.userProfile.comments],
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload === "wrong username") {
          state.status = "failed";
          state.error = "wrong username";
        } else if (action.payload === "wrong password") {
          state.status = "failed";
          state.error = "wrong password";
        } else {
          state.status = "succeeded";
          state.userProfile = action.payload;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(visitUser.pending, (state, action) => {
        state.visitingUserStatus = "loading";
      })
      .addCase(visitUser.fulfilled, (state, action) => {
        if (action.payload === "no user found") {
          state.visitingUserStatus = "failed";
          state.error = "no user found";
        } else {
          state.visitingUserStatus = "succeeded";
        }
      })
      .addCase(visitUser.rejected, (state, action) => {
        state.visitingUserStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userProfile = {
          username: "",
          access_token: "",
          id: "",
          isLoggedIn: false,
          following: [],
          followers: [],
          wrotePost: [],
        };
      })
      .addCase(addProfileComment.fulfilled, (state, action) => {
        console.log(action);
        state.userProfile.comments = [...state.userProfile.comments];
      });
  },
});

export const getVisitingStatus = (state) => state.user.visitingUserStatus;
export const selectUser = (state) => state.user;

export const { access_token, setUserProfile, pushProfileComment } =
  userSlice.actions;

export default userSlice.reducer;
