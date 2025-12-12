import { Route } from "react-router-dom";
import { SignUpPage } from "../modules/auth/pages/SignUpPage";
import { SignInPage } from "../modules/auth/pages/SignInPage";
import { ForgetPasswordPage } from "../modules/auth/pages/ForgetPassword";
import { VerifyCodePage } from "../modules/auth/pages/VeridyCode";
import { ResetPasswordPage } from "../modules/auth/pages/ResetPassword";
import { ROUTES } from "../shared/constants";

export const authRoutes = [
  <Route path={ROUTES.SIGNUP} element={<SignUpPage />} key="signup" />,
  <Route path={ROUTES.SIGNIN} element={<SignInPage />} key="signin" />,
  <Route path={ROUTES.FORGET_PASSWORD} element={<ForgetPasswordPage />} key="forget" />,
  <Route path={ROUTES.VERIFY_CODE} element={<VerifyCodePage />} key="verify" />,
  <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} key="reset" />,
];