import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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
const likePostURL = "/posts/like_post";
const viewPostURL = "./posts/view_post";

export const fetchPostsWithLimit = createAsyncThunk(
  "posts/fetchPostsWithLimit",
  async ({ from, to, sort }) => {
    try {
      const result = await axios.post(baseURL + getAllPostURL, {
        from: from,
        to: to,
        sort: sort,
      });
      return result.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, content, author }) => {
    try {
      const result = await axios.post(baseURL + creatPostURL, {
        title: title,
        content: content,
        author: author,
      });
      return result.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ username, post_id }) => {
    try {
      await axios.post(baseURL + likePostURL, {
        username: username,
        post_id: post_id,
      });
    } catch (error) {
      return error.message;
    }
  }
);
export const viewPost = createAsyncThunk(
  "posts/viewPost",
  async ({ username, post_id }) => {
    try {
      await axios.post(baseURL + viewPostURL, {
        username: username,
        post_id: post_id,
      });
    } catch (error) {
      return error.message;
    }
  }
);
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ post_id, comment }) => {
    try {
      await axios.post(baseURL + addPostCommentURL, {
        comment: comment,
        id: post_id,
      });
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  hasMore: true,
  loadCount: 15,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    cleanPosts: (state, action) => {
      state.posts = [];
    },
    pushCommentIntoState: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          console.log("add comment");
          return {
            ...post,
            comments: [action.payload.comment, ...post.comments],
          };
        }
        return post;
      });
    },
    pushLikesIntoState: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          console.log("add like");
          return {
            ...post,
            likes: [action.payload.username, ...post.likes],
          };
        }
        return post;
      });
    },
    pushViewsIntoState: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            views: [action.payload.username, ...post.views],
          };
        }
        return post;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostsWithLimit.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPostsWithLimit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(...action.payload);
        if (action.payload.length < state.loadCount) state.hasMore = false;
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
export const getPostsLoadCount = (state) => state.post.loadCount;
export const getPostsHasMore = (state) => state.post.hasMore;

export const {
  cleanPosts,
  pushCommentIntoState,
  pushLikesIntoState,
  pushViewsIntoState,
} = postSlice.actions;

export default postSlice.reducer;
