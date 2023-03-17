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

const fetchPostFeedURL = "/posts/get_posts_with_limit";
const creatPostURL = "/posts/create_post";
const addPostCommentURL = "/posts/create_comment";
const likePostURL = "/posts/like_post";
const dislikePostURL = "/posts/dislike_post";
const viewPostURL = "/posts/view_post";
const getMantPostsURL = "/posts/get_many_posts_by_id";

export const fetchPostsWithLimit = createAsyncThunk(
  "posts/fetchPostsWithLimit",
  async ({ from, to, sort }) => {
    try {
      const result = await axios.post(baseURL + fetchPostFeedURL, {
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

export const fetchPostsWithIds = createAsyncThunk(
  "post/fetchPostsWithIds",
  async (ids) => {
    const url = baseURL + getMantPostsURL;
    try {
      const records = await axios.post(url, { ids: ids });
      return records;
    } catch (error) {
      return error.message;
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, content, author, category, authorId }) => {
    try {
      const result = await axios.post(baseURL + creatPostURL, {
        title: title,
        content: content,
        author: author,
        category: category,
        authorId: authorId,
      });
      return result.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async ({ username, post_id }) => {
    try {
      console.log({ username, post_id });
      await axios.post(baseURL + dislikePostURL, {
        username: username,
        post_id: post_id,
      });
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
  loadCount: 40,
  fullscreen: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setFullscreenState: (state, action) => {
      state.fullscreen = action.payload;
    },
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
          return {
            ...post,
            likes: [action.payload.username, ...post.likes],
          };
        }
        return post;
      });
    },
    pullLikesFromState: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          let newLikes = post.likes.filter(
            (like) => like !== action.payload.username
          );
          return {
            ...post,
            likes: newLikes,
          };
        }
        return post;
      });
    },
    pushViewsIntoState: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
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
export const getFullscreenState = (state) => state.post.fullscreen;

export const {
  cleanPosts,
  pushCommentIntoState,
  pushLikesIntoState,
  pushViewsIntoState,
  setFullscreenState,
  pullLikesFromState,
} = postSlice.actions;

export default postSlice.reducer;
