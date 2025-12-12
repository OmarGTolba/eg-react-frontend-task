import React from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks";
import { signUpUser } from "../../../store/authSlice";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";

import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  firstName: yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
  lastName: yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .matches(/[0-9]/, "Password must contain numbers")
    .matches(/[^a-zA-Z0-9]/, "Password must contain special characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
}).required();

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    dispatch(signUpUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <Input 
            label="First Name"
            {...field}
            error={errors.firstName?.message}
            className="bg-white/40 backdrop-blur-md border border-white/30"
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <Input 
            label="Last Name"
            {...field}
            error={errors.lastName?.message}
            className="bg-white/40 backdrop-blur-md border border-white/30"
          />
        )}
      />

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

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input 
            label="Confirm Password"
            type="password"
            {...field}
            error={errors.confirmPassword?.message}
            className="bg-white/40 backdrop-blur-md border border-white/30"
          />
        )}
      />

   

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>

      <p className="text-center text-gray-600 text-sm mt-4">
        Already have an account?{" "}
        <span
          className="text-blue-600 underline cursor-pointer font-medium"
          onClick={() => navigate("/login")}
        >
          Sign In
        </span>
      </p>

    </form>
  );
};
