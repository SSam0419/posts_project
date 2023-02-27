import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = [
//   {
//     _id: "",
//     title: "",
//     author: "",
//     content: "",
//     likes: 0,
//     views: 0,
//     createdAt: "",
//     comments: [],
//   },
// ];

const baseURL = "http://localhost:5000";
const getAllPostURL = "/posts/get_all_posts";
const getSinglePostURL = "/posts/get_post_by_id";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    try {
      const result = await axios.get(baseURL + getAllPostURL);
      console.log(result.data);
      return result.data;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = { posts: [], status: "idle", error: null };

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    pushAllPosts: (state, action) => {
      state.posts = action.payload;
    },
    pushSinglePost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.post.posts;
export const getPostsStatus = (state) => state.post.status;
export const getPostsError = (state) => state.post.error;

export const { pushAllPosts, pushSinglePost } = postSlice.actions;

export default postSlice.reducer;
