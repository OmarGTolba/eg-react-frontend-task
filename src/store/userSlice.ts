import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../shared/utils/axiosInstance";
import { storage } from "../shared/utils/storage";
import type { UserProfile } from "../modules/user/types/userTypes";


interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

// Fetch user profile
export const fetchUserProfile = createAsyncThunk<UserProfile, void, { rejectValue: string }>(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<UserProfile>("/users/profile");
      return res.data;
    } catch (err) {
      const error = err as any;
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch profile");
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk<UserProfile, { id: string; data: Partial<UserProfile> }, { rejectValue: string }>(
  "user/updateProfile",
  async ({data,id}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch<UserProfile>(`/users/${id}`, data);
      return res.data;
    } catch (err) {
      const error = err as any;
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update profile");
    }
  }
);

// Delete user account
export const deleteAccount = createAsyncThunk<void, string, { rejectValue: string }>(
  "user/deleteAccount",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      storage.clearAuth(); 
    } catch (err) {
      const error = err as any;
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to delete account");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
      })

      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.profile = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete account";
      });
  },
});

export const { clearError, clearProfile } = userSlice.actions;
export default userSlice.reducer;
