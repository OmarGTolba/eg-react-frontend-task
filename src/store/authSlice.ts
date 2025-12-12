import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../shared/utils/axiosInstance";
import { storage } from "../shared/utils/storage";
import type { SignInData, SignUpData, User } from "../modules/auth/types/authTypes";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: storage.getUser(),
  loading: false,
  error: null,
};

export const signUpUser = createAsyncThunk<User, SignUpData, { rejectValue: string }>(
  "auth/signUpUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<User>("/auth/signup", data);
      return response.data;
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        return rejectWithValue(error.response?.data?.message || error.message || 'Signup failed');
      }
      return rejectWithValue('Signup failed');
    }
  }
);

export const signInUser = createAsyncThunk<User, SignInData, { rejectValue: string }>(
  "auth/signInUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<User>("/auth/login", data);
      return response.data;
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        return rejectWithValue(error.response?.data?.message || error.message || 'Sign in failed');
      }
      return rejectWithValue('Sign in failed');
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
  
      storage.clearAuth();
    } catch (err) {
  
      storage.clearAuth();
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        return rejectWithValue(error.response?.data?.message || error.message || 'Logout failed');
      }
      return rejectWithValue('Logout failed');
    }
  }
);


export const sendPasswordResetEmail = createAsyncThunk<unknown, { email: string }, { rejectValue: string }>(
  "auth/sendPasswordResetEmail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      return res.data; 
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        return rejectWithValue(error.response?.data?.message || 'Failed to send reset email');
      }
      return rejectWithValue('Failed to send reset email');
    }
  }
);

export const verifyResetCode = createAsyncThunk<{ token?: string }, { email: string; code: string }, { rejectValue: string }>(
  "auth/verifyResetCode",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/verify-reset-code", data);
  
      return res.data;  
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        return rejectWithValue(error.response?.data?.message || 'Failed to verify code');
      }
      return rejectWithValue('Failed to verify code');
    }
  }
);

export const resetPassword = createAsyncThunk<unknown, { email: string; code: string; newPassword: string }, { rejectValue: string }>(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/reset-password", data);
      return res.data;  
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
      }
      return rejectWithValue('Failed to reset password');
    }
  }
);
 


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      storage.clearAuth();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
  
    .addCase(signUpUser.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
       
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      })
  
      .addCase(signInUser.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        storage.setUser(action.payload);
        if (action.payload.token) {
          storage.setToken(action.payload.token);
        }
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sign in failed';
      })
  
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
  
      .addCase(sendPasswordResetEmail.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(sendPasswordResetEmail.fulfilled, (state) => { 
        state.loading = false; 
        state.error = null;
      })
      .addCase(sendPasswordResetEmail.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload || 'Failed to send reset email'; 
      })
  
      .addCase(verifyResetCode.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(verifyResetCode.fulfilled, (state) => { 
        state.loading = false; 
        state.error = null;
      })
      .addCase(verifyResetCode.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload || 'Failed to verify code'; 
      })
  
      .addCase(resetPassword.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(resetPassword.fulfilled, (state) => { 
        state.loading = false; 
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload || 'Failed to reset password'; 
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;