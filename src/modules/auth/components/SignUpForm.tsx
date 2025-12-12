import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks";
import { signUpUser, clearError } from "../../../store/authSlice";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpSchema } from "../../../shared/utils/validation";
import { ROUTES } from "../../../shared/constants";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      await dispatch(signUpUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })).unwrap();
      
      toast.success("Account created successfully!");
      navigate(ROUTES.SIGNIN);
    } catch {
    }
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
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>

      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 underline hover:text-blue-700 transition font-medium"
            onClick={() => navigate(ROUTES.SIGNIN)}
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
};