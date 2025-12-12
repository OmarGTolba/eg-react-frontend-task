import React from "react";
import { Route } from "react-router-dom";
import { SignUpPage } from "../modules/auth/pages/SignUpPage";
import { SignInPage } from "../modules/auth/pages/SignInPage";
import { ForgetPasswordPage } from "../modules/auth/pages/ForgetPassword";
import { VerifyCodePage } from "../modules/auth/pages/VeridyCode";
import { ResetPasswordPage } from "../modules/auth/pages/ResetPassword";

export const authRoutes = [
  <Route path="/signup" element={<SignUpPage />} key="signup" />,
  <Route path="/signin" element={<SignInPage />} key="signin" />,
  <Route path="/forget-password" element={<ForgetPasswordPage />} key="forget" />,
  <Route path="/verify-code" element={<VerifyCodePage />} key="verify" />,
  <Route path="/reset-password" element={<ResetPasswordPage />} key="reset" />,
];
