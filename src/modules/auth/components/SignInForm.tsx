import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks";
import { signInUser } from "../../../store/authSlice";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { SignInData } from "../types/authTypes";
import { toast } from "react-toastify";

interface SignInFormValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required(),
  password: yup.string().required(),
});

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit =async (data: SignInData) => {
  
  try{  const res = await dispatch(signInUser(data)).unwrap();
  
    if (res) {
      navigate("/dashboard");
    }
  } catch (err:any) {
    
   toast.error(err as string)
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

     
  <p className="text-end text-gray-600 text-sm ">
         
 <span 
          onClick={() => navigate("/forget-password")}
          className=" text-center text-blue-400 text-sm underline cursor-pointer font-medium"
          >
          Forget Password?
        </span>
 
             </p>
      <Button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-white text-blue-600 font-bold shadow-lg hover:bg-blue-50 transition"
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>

 <div className="flex flex-col items-center justify-center gap-y-1">


      <p className="text-center text-gray-600 text-sm ">
        Don’t have an account?{" "}
 
 
             </p>
     
 <span 
          onClick={() => navigate("/signup")}
          className=" text-center text-blue-400 text-sm underline cursor-pointer font-bold"
          >
          Sign Up
        </span>
            </div>




    </form>
  );
};
