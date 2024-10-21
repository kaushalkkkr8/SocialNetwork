import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const api = "http://localhost:3000";
const api = "https://major-project2-part1-backend.vercel.app";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get(`${api}/fetchPost`);
  console.log(res);

  return res.data;
});

export const postPost = createAsyncThunk("posts/postPost", async ({ newData }) => {
  const res = await axios.post(`${api}/post`, newData);
  console.log(res);
  return res.data;
});

export const editPost = createAsyncThunk("posts/editPost", async ({ id, newData }) => {
  console.log("id", id);
  console.log("newData", newData);

  const res = await axios.put(`${api}/editPost/${id}`, newData);
  console.log(res);
  return res.data;
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  const res = await axios.delete(`${api}/deletePost/${id}`);
  console.log(res);
  return res.data;
});

export const postComment = createAsyncThunk("posts/postComments", async ({ postId, newData }) => {
  const res = await axios.put(`${api}/post/postComents/${postId}`, newData);

  return res.data;
});

export const deleteComment = createAsyncThunk("post/deleteComment", async ({ commentId }) => {
  const res = await axios.delete(`${api}/post/deleteComent/${commentId}`);
  console.log(res);
  return res.data;
});

export const addBookMark = createAsyncThunk("post/addBookMark", async ({ id, dataToadd }) => {
  const res = await axios.post(`${api}/post/bookmark/${id}`, dataToadd);
  return res.data;
});

export const removeBookMark = createAsyncThunk("post/removeBookMark", async ({ id, dataToRemove }) => {
  console.log(dataToRemove);

  const res = await axios.delete(`${api}/post/removeBookmark/${id}`, { data: dataToRemove });
  return res.data;
});
export const addLikes = createAsyncThunk("post/addLikes", async ({ id, dataToAdd }) => {
  const res = await axios.post(`${api}/post/like/${id}`, dataToAdd);
  return res.data;
});

export const removeLikes = createAsyncThunk("post/removeLikes", async ({ id, dataToRemove }) => {
 
  const res = await axios.delete(`${api}/post/like/${id}`, { data: dataToRemove });
  return res.data;
});

const postSlice = createSlice({
  name: "Posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, async (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //Post Add
      .addCase(postPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postPost.fulfilled, (state, action) => {
        state.status = "success";
        console.log("action.payload", action.payload);

        state.posts = action.payload;
        console.log("post post", action.payload);
      })

      .addCase(postPost.rejected, async (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //edit posts
      .addCase(editPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "success";
        console.log("action.payload", action.payload);

        state.posts = action.payload;
        console.log("post post", action.payload);
      })

      .addCase(editPost.rejected, async (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //delete Post
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "success";
        console.log("Action.payload", action.payload);

        state.posts = state.posts.filter((posts) => posts._id !== action.payload.post._id);
      })

      .addCase(deletePost.rejected, async (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //POST COMENTS IN POSTS
      .addCase(postComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPost = state.posts.find((post) => post._id === action.payload._id);
        if (updatedPost) {
          updatedPost.comments = action.payload.comments;
        }
      })
      .addCase(postComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    //deleteComments

    builder.addCase(deleteComment.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.status = "succeeded";
      const postIndex = state.posts.findIndex((post) => post._id === action.payload.comment._id);

      if (postIndex !== -1) {
        state.posts[postIndex] = action.payload.comment;
      }
    });

    builder
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //addBookmark
      .addCase(addBookMark.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBookMark.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Action.payload", action.payload);

        
        state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      })
      .addCase(addBookMark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //removeBookmark
      .addCase(removeBookMark.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeBookMark.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id
            ? { ...post, bookmarked: action.payload.bookmarked }
            : post
        );
      })
      .addCase(removeBookMark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })




      //Liked 
      .addCase(addLikes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLikes.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Action.payload addLike", action.payload);

        
        state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      })
      .addCase(addLikes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //remove like
      .addCase(removeLikes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeLikes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id
            ? { ...post, likes: action.payload.likes }
            : post
        );
      })
      .addCase(removeLikes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default postSlice.reducer;
