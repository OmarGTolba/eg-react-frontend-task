import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks";
import { signInUser, clearError } from "../../../store/authSlice";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInSchema } from "../../../shared/utils/validation";
import { ROUTES, USER_ROLES } from "../../../shared/constants";
import { decodeToken } from "../../../shared/utils/jwt";
import type { SignInData } from "../types/authTypes";

interface SignInFormValues {
  email: string;
  password: string;
}

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({
    resolver: yupResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data: SignInData) => {
    try {
      const res = await dispatch(signInUser(data)).unwrap();
      
      if (res?.token) {
        const decoded = decodeToken(res.token);
        if (decoded) {
          const redirectPath = decoded.role === USER_ROLES.ADMIN ? ROUTES.ADMIN_HOME : ROUTES.USER_HOME;
          navigate(redirectPath, { replace: true });
          toast.success("Signed in successfully!");
        }
      }
    } catch {
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input 
            label="Email Address"
            {...field}
            error={errors.email?.message}
            className="bg-white/40 backdrop-blur-md border border-white/30"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input 
            label="Password"
            type="password"
            {...field}
            error={errors.password?.message}
            className="bg-white/40 backdrop-blur-md border border-white/30"
          />
        )}
      />

      <div className="text-end">
        <button 
          type="button"
          onClick={() => navigate(ROUTES.FORGET_PASSWORD)}
          className="text-blue-400 text-sm underline hover:text-blue-500 transition font-medium"
        >
          Forget Password?
        </button>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl  font-bold shadow-lg  transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <button 
            type="button"
            onClick={() => navigate(ROUTES.SIGNUP)}
            className="text-blue-400 underline hover:text-blue-500 transition font-bold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </form>
  );
};