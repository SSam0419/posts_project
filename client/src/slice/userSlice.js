import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  access_token: "",
  id: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    access_token: (state, action) => {
      state.access_token = action.payload;
    },
    username: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const selectUser = (state) => state.user;

export const { access_token, username } = userSlice.actions;

export default userSlice.reducer;
