import React from "react";
import { useNavigate } from "react-router-dom";




import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks";
import { sendPasswordResetEmail } from "../../../store/authSlice";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";

interface ForgetPasswordFormValues {
  email: string;
}

export const ForgetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<ForgetPasswordFormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgetPasswordFormValues) => {
    dispatch(sendPasswordResetEmail(data))
      .unwrap()
      .then(() => {
        navigate("/verify-code", { state: { email: data.email } }); 
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center mb-2">Forgot Password</h1>
        <p className="text-center text-gray-500 mb-4">Enter your email to receive a verification code</p>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input 
              label="Email Address"
              {...field}
              error={errors.email?.message}
              className="bg-white/40 border border-gray-200"
            />
          )}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          {loading ? "Sending..." : "Send Code"}
        </Button>
      </form>
    </div>
  );
};
