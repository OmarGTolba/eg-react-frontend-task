import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../shared/utils/axiosInstance";
import type { SignInData, SignUpData, User } from "../modules/auth/types/authTypes";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  loading: false,
  error: null,
};

export const signUpUser = createAsyncThunk<User, SignUpData>(
  "auth/signUpUser",
  async (data, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosInstance.post<User>("/auth/signup", data);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const signInUser = createAsyncThunk<User, SignInData>(
  "auth/signInUser",
  async (data, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosInstance.post<User>("/auth/login", data);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      
      return true;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const sendPasswordResetEmail = createAsyncThunk(
  "auth/sendPasswordResetEmail",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      return res.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to send reset email");
    }
  }
);

export const verifyResetCode = createAsyncThunk(
  "auth/verifyResetCode",
  async (data: { email: string; code: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/verify-reset-code", data);
 localStorage.setItem('resetCode',data.code)
      return res.data;  
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to verify code");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: { email: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/reset-password", {...data,code:localStorage.getItem('resetCode')});
      localStorage.removeItem('resetCode')
      return res.data;  
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to reset password");
    }
  }
);
 


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
           })
      .addCase(signUpUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signInUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
         localStorage.setItem("token", (action.payload as any).access_token);
    }).addCase(logoutUser.fulfilled, (state) => {
  state.user = null;
  localStorage.removeItem("token");
})

      .addCase(signInUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
   builder.addCase(sendPasswordResetEmail.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(sendPasswordResetEmail.fulfilled, (state) => { state.loading = false; });
    builder.addCase(sendPasswordResetEmail.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

    builder.addCase(verifyResetCode.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(verifyResetCode.fulfilled, (state) => { state.loading = false; });
    builder.addCase(verifyResetCode.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

    builder.addCase(resetPassword.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(resetPassword.fulfilled, (state) => { state.loading = false; });
    builder.addCase(resetPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
