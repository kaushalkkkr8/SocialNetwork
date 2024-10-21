import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const api = "http://localhost:3000";
const api = "https://major-project2-part1-backend.vercel.app";

export const fetchLogInUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axios.get(`${api}/profile`);
  return res.data;
});

export const postUser = createAsyncThunk("user/postUser", async (newUser) => {
  const res = await axios.post(`${api}/signUp`, newUser);
  return res.data;
});

export const logInStatus = createAsyncThunk("user/updateLogIn", async ({ id, updateprofile }) => {
  const res = await axios.put(`${api}/editProfile/${id}`, updateprofile);
  return res.data;
});

export const editProfile = createAsyncThunk("user/editProfile", async ({ id, updateProfile }) => {
  const res = await axios.put(`${api}/editProfile/${id}`, updateProfile);

  return res.data;
});

export const addFollowing = createAsyncThunk("user/addFollowing", async ({ id, updateFollowing }) => {
  const res = await axios.put(`${api}/profile/addFollowing/${id}`, updateFollowing);

  return res.data;
});

export const addFollower = createAsyncThunk("user/addFollower", async ({ id, updateFollower }) => {
  const res = await axios.put(`${api}/profile/addFollower/${id}`, updateFollower);
  console.log(res);

  return res.data;
});

export const deleteFollower = createAsyncThunk("user/deleteFollower", async (id) => {
  const res = await axios.delete(`${api}/profile/removeFollower/${id}`);
  console.log(res);
  return res.data;
});
export const deleteFollowing = createAsyncThunk("user/deleteFollowing", async (id) => {
  const res = await axios.delete(`${api}/profile/removeFollowing/${id}`);
  console.log(res);
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
    // fetchUser
    builder.addCase(fetchLogInUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLogInUser.fulfilled, (state, action) => {
      state.status = "success";
      state.profile = action.payload;
    });
    builder.addCase(fetchLogInUser.rejected, async (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // signUp
    builder.addCase(postUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = "success";
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // logIn status
    builder.addCase(logInStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logInStatus.fulfilled, (state, action) => {
      state.status = "success";
      const updatedLogIn = state.profile.find((user) => user._id === action.payload._id);
      if (updatedLogIn) {
        updatedLogIn.logIn = action.payload.logIn;
      }
    });
    builder.addCase(logInStatus.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // edit profile
    builder.addCase(editProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.profile.findIndex((user) => user._id === action.payload._id);

      if (index !== -1) {
        state.profile[index] = { ...state.profile[index], ...action.payload };
      }
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Add Following
    builder.addCase(addFollowing.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addFollowing.fulfilled, (state, action) => {
      state.status = "success";

      const updatedProfile = state.profile.find((user) => user._id === action.payload._id);
      if (updatedProfile) {
        updatedProfile.following = action.payload.following;
      }
    });
    builder.addCase(addFollowing.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Add Follower
    builder.addCase(addFollower.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addFollower.fulfilled, (state, action) => {
      state.status = "success";

      const updatedProfile = state.profile.find((user) => user._id === action.payload._id);
      if (updatedProfile) {
        updatedProfile.follower = action.payload.follower;
      }
    });
    builder.addCase(addFollower.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //delete follower

    builder.addCase(deleteFollower.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteFollower.fulfilled, (state, action) => {
      state.status = "success";
      console.log("action delet flr", action.payload);
    
      
      const userIndex = state.profile.findIndex(profile => profile._id === action.payload.profile._id);
      console.log("userIndex D flr",userIndex);

      if (userIndex !== -1) {
        state.profile[userIndex] = action.payload.profile;
      }
      

      // state.profile = state.profile.map((user) => {
      //   if (user._id === action.payload.profile._id) {
      //     return {
      //       ...user.follower,
      //       follower: action.payload.profile.follower,
      //     };
      //   }
      //   return user;
      // });
    });
    builder.addCase(deleteFollower.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //Delete following
    builder.addCase(deleteFollowing.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteFollowing.fulfilled, (state, action) => {
      state.status = "success";
      console.log("action delet fling", action.payload);

      const userIndex = state.profile.findIndex(profile => profile._id === action.payload.deleteData._id);
      console.log("userIndex D flng",userIndex);

      if (userIndex !== -1) {
        state.profile[userIndex] = action.payload.deleteData;
      }
    });

    builder.addCase(deleteFollowing.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export default userSlice.reducer;
