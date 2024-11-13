import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = "https://major-project2-backend.vercel.app";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axios.get(`${api}/userProfile`);
  
  
  return res.data;
});

export const postUser = createAsyncThunk("user/postUser", async (newUser) => {
  const res = await axios.post(`${api}/signUp`, newUser);
  return res.data;
});

export const editProfile = createAsyncThunk("user/editProfile", async ({ id, updateProfile }) => {
  const res = await axios.put(`${api}/profile/editProfile/${id}`, updateProfile,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
});



export const addFollow = createAsyncThunk("user/addFollow", async ({ id, targetUserId }) => {
  const res = await axios.put(`${api}/profile/follow/${id}`, { targetUserId });
  return res.data;
});

export const deleteFollow = createAsyncThunk("user/deleteFollow", async ({ id, targetUserId }) => {
  const res = await axios.put(`${api}/profile/unfollow/${id}`, { targetUserId });
  return res.data;
});


export const addBookMark = createAsyncThunk("user/addBookMark", async ({ id, dataToadd }) => {
  const res = await axios.post(`${api}/profile/bookmark/${id}`, dataToadd);
 
  
  return res.data;
});

export const removeBookMark = createAsyncThunk("user/removeBookMark", async ({ id, dataToRemove }) => {
  const res = await axios.delete(`${api}/profile/removeBookmark/${id}`, { data: dataToRemove });

  return res.data;
});

const userSlice = createSlice({
  name: "User Profile",
  initialState: {
    profile: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // fetchUser
    .addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "success";
      state.profile = action.payload;
    })
    .addCase(fetchUser.rejected,  (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
    // signUp
    .addCase(postUser.pending, (state) => {
      state.status = "loading";
    })
    .addCase(postUser.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = "success";
    })
    
    .addCase(postUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
  
    

    // edit profile
    .addCase(editProfile.pending, (state) => {
      state.status = "loading";
    })
   .addCase(editProfile.fulfilled, (state, action) => {

    
      state.status = "success";
      const index = state.profile.findIndex((user) => user._id === action.payload.profile._id);
     
      

      if (index !== -1) {
        state.profile[index] =   { ...action.payload.profile };
      }
    })
    .addCase(editProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })

   

.addCase(addFollow.pending, (state) => {
      state.status = "loading";
    })
   .addCase(addFollow.fulfilled, (state, action) => {
      state.status = "success";

      const { updatedUserProfile, updatedTargetProfile } = action.payload;

      const userProfileIndex = state.profile.findIndex((user) => user._id === updatedUserProfile._id);
      const targetProfileIndex = state.profile.findIndex((user) => user._id === updatedTargetProfile._id);

      if (userProfileIndex !== -1 && targetProfileIndex !== -1) {
        state.profile[userProfileIndex] = updatedUserProfile;
        state.profile[targetProfileIndex] = updatedTargetProfile;
      }
    })
   .addCase(addFollow.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })

    

    .addCase(deleteFollow.pending, (state) => {
      state.status = "loading";
    })
    .addCase(deleteFollow.fulfilled, (state, action) => {
      state.status = "success";

      const { updatedUserProfile, updatedTargetProfile } = action.payload;

      const userProfileIndex = state.profile.findIndex((user) => user._id === updatedUserProfile._id);
      const targetProfileIndex = state.profile.findIndex((user) => user._id === updatedTargetProfile._id);

      if (userProfileIndex !== -1 && targetProfileIndex !== -1) {
        state.profile[userProfileIndex] = updatedUserProfile;
        state.profile[targetProfileIndex] = updatedTargetProfile;
      }
    })
   
      .addCase(deleteFollow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //addBookmark
      .addCase(addBookMark.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBookMark.fulfilled, (state, action) => {
        state.status = "succeeded";
        const indexOf = state.profile.findIndex((profile) => profile._id === action.payload._id);
        if (indexOf !== -1) {
          state.profile[indexOf] = action.payload;
        }
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
     
        
        const profile = state.profile.find((profile) => profile._id === action.payload._id);
        if (profile) {
          profile.bookmarked = action.payload.bookmarked;
        }
      })
      .addCase(removeBookMark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});
export default userSlice.reducer;






