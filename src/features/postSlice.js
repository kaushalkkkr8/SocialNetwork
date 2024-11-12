import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = "https://major-project2-backend.vercel.app";



export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get(`${api}/post`);

  return res.data;
});



export const postPost = createAsyncThunk("posts/postPost", async ({ newData }) => {
  const res = await axios.post(`${api}/post`, newData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // const res = await axios.post(`${api}/post`, newData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   withCredentials: true,  
  // });
  return res.data;
});


export const editPost = createAsyncThunk("posts/editPost", async ({ id, newData }) => {
  const res = await axios.put(`${api}/editPost/${id}`, newData);
  return res.data;
});

// export const editPost = createAsyncThunk("posts/editPost", async ({ id, newData }) => {
//   const res = await axios.put(`${api}/post/editPost/${id}`, newData,{
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return res.data;
// });


export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  const res = await axios.delete(`${api}/deletePost/${id}`);
  return res.data;
});

export const postComment = createAsyncThunk("posts/postComments", async ({ postId, newData }) => {
  const res = await axios.put(`${api}/post/postComents/${postId}`, newData);

  return res.data;
});

export const deleteComment = createAsyncThunk("post/deleteComment", async ({ commentId }) => {
  const res = await axios.delete(`${api}/post/deleteComent/${commentId}`);
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
        state.posts = action.payload.reverse();
       
      })
     
      .addCase(fetchPosts.rejected, async (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //Post Add
      .addCase(postPost.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(postPost.fulfilled, (state, action) => {
      //   state.status = "success";

      //   state.posts = action.payload;
      // })
      // .addCase(postPost.fulfilled, (state, action) =>  ({
      //   ...state,
      //   status: "success",
      //   posts: action.payload,
      // }))
      .addCase(postPost.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
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

        state.posts = action.payload;
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
          updatedPost.comments = action.payload.comments.reverse();
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
        state.posts[postIndex] = { ...action.payload.comment };
      }
    });

    builder
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      

      //Liked
      .addCase(addLikes.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(addLikes.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   console.log("action.payload like", action.payload);

      //   state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      // })
      .addCase(addLikes.fulfilled, (state, action) => {
        state.status = "succeeded";
        const post = state.posts.find((post) => post._id === action.payload._id);
        if (post) {
          post.likes = action.payload.likes; // Update likes directly within the found post
        }
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
        state.posts = state.posts.map((post) => (post._id === action.payload._id ? { ...post, likes: action.payload.likes } : post));
      })
      .addCase(removeLikes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default postSlice.reducer;


// postSlice.js
// postSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// const api = "https://major-project2-backend.vercel.app";
// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (token) => {
//   const response = await fetch(`${api}/posts`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.json();
// });

// const postSlice = createSlice({
//   name: 'post',
//   initialState: {
//     posts: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     addPost: (state, action) => {
//       state.posts.push(action.payload);
//     },
//     removePost: (state, action) => {
//       const index = state.posts.findIndex(post => post.id === action.payload);
//       if (index !== -1) {
//         state.posts.splice(index, 1);
//       }
//     },
//     addComment: (state, action) => {
//       const post = state.posts.find(post => post.id === action.payload.postId);
//       if (post) {
//         post.comments.push(action.payload.comment);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.posts = action.payload;
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addPost, removePost, addComment } = postSlice.actions;
// export default postSlice.reducer;



