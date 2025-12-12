import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks";
import { verifyResetCode } from "../../../store/authSlice";
import { Button } from "../../../shared/components/Button";
import { InputOtp } from "primereact/inputotp";
import { toast } from "react-toastify";
import { ROUTES } from "../../../shared/constants";

interface VerifyCodeFormValues {
  code: string;
}

export const VerifyCodePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const email = (location.state as any)?.email;

  const { control, handleSubmit, formState: { errors } } = useForm<VerifyCodeFormValues>({
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
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Verify Code</h1>
        <p className="text-center text-gray-500">Enter the verification code sent to your email</p>

        <Controller
          name="code"
          control={control}
          rules={{ 
            required: "Code is required", 
            minLength: { value: 6, message: "Enter all 6 digits" } 
          }}
          render={({ field }) => (
            <div className="flex justify-center">
              <InputOtp 
                length={6}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                integerOnly 
                mask 
                className="mx-auto"
              />

              {errors.code && (
                <p className="text-red-500 text-sm mt-2 text-center w-full">
                  {errors.code.message}
                </p>
              )}
            </div>
          )}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
};
