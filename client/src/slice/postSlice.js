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

const getAllPostURL = "/posts/get_posts_with_limit";
const getSinglePostURL = "/posts/get_post_by_id";
const creatPostURL = "/posts/create_post";
const addPostCommentURL = "/posts/create_comment";

export const fetchPostsWithLimit = createAsyncThunk(
  "posts/fetchPostsWithLimit",
  async () => {
    try {
      const result = await axios.post(baseURL + getAllPostURL, {
        from: 0,
        to: 10,
      });
      console.log(result.data);
      return result.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, content }) => {
    try {
      const result = await axios.post(baseURL + creatPostURL, {
        title: title,
        content: content,
        author: "temporary author",
      });
      console.log(result.data);
      return result.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ post_id, comment }) => {
    try {
      const result = await axios.post(baseURL + addPostCommentURL, {
        comment: comment,
        id: post_id,
      });
      return result;
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
      .addCase(fetchPostsWithLimit.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPostsWithLimit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPostsWithLimit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
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
