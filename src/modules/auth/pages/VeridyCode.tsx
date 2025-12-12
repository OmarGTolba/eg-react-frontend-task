import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks";
import { verifyResetCode } from "../../../store/authSlice";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import { verifyCodeSchema } from "../../../shared/utils/validation";
import { ROUTES } from "../../../shared/constants";

interface VerifyCodeFormValues {
  code: string;
}

interface LocationState {
  email: string;
}

export const VerifyCodePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  const state = location.state as LocationState;
  const email = state?.email;

  const { control, handleSubmit, formState: { errors } } = useForm<VerifyCodeFormValues>({
    resolver: yupResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (data: VerifyCodeFormValues) => {
    if (!email) {
      toast.error("Email not found. Please start from forgot password.");
      navigate(ROUTES.FORGET_PASSWORD);
      return;
    }

    try {
      await dispatch(verifyResetCode({ email, code: data.code })).unwrap();
      toast.success("Code verified successfully!");
      navigate(ROUTES.RESET_PASSWORD, { state: { email, code: data.code } });
    } catch {
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center mb-2">Verify Code</h1>
        <p className="text-center text-gray-500 mb-4">Enter the verification code sent to your email</p>

        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <Input 
              label="Verification Code"
              {...field}
              error={errors.code?.message}
              className="bg-white/40 border border-gray-200"
            />
          )}
        />

        <Button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
};