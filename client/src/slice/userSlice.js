import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000";

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
  axios.defaults.withCredentials = true;
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

const initialState = {
  userProfile: { username: "", access_token: "", id: "", isLoggedIn: false },
  status: "idle",
  error: null,
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
      state.userProfile.isLoggedIn = true;
      state.userProfile.access_token = action.payload.access_token;
      state.userProfile.username = action.payload.username;
      state.userProfile.id = action.payload.id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload == "wrong username") {
          state.status = "failed";
          state.error = "wrong username";
        } else if (action.payload == "wrong password") {
          state.status = "failed";
          state.error = "wrong password";
        } else {
          state.status = "succeeded";
          state.userProfile.isLoggedIn = true;
          state.userProfile.access_token = action.payload.access_token;
          state.userProfile.username = action.payload.username;
          state.userProfile.id = action.payload.id;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user;

export const { access_token, setUserProfile } = userSlice.actions;

export default userSlice.reducer;
