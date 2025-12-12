import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks";
import { resetPassword } from "../../../store/authSlice";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { resetPasswordSchema } from "../../../shared/utils/validation";
import { ROUTES } from "../../../shared/constants";

interface ResetPasswordFormValues {
    newPassword: string;
    confirmPassword: string;
}

interface LocationState {
    email: string;
    code: string;
}

export const ResetPasswordPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.auth);
    const state = location.state as LocationState;
    
    const email = state?.email;
    const code = state?.code;

    const { control, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: { newPassword: "", confirmPassword: "" },
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        if (!email || !code) {
            toast.error("Invalid reset session. Please request a new password reset.");
            navigate(ROUTES.FORGET_PASSWORD);
            return;
        }
        
        try {
            await dispatch(resetPassword({ email, code, newPassword: data.newPassword })).unwrap();
            toast.success("Password reset successfully!");
            navigate(ROUTES.SIGNIN);
        } catch {
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
                <p className="text-center text-gray-500 mb-4">Enter your new password</p>

                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                        <Input label="New Password" type="password" {...field} error={errors.newPassword?.message} className="bg-white/40 border border-gray-200" />
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <Input label="Confirm Password" type="password" {...field} error={errors.confirmPassword?.message} className="bg-white/40 border border-gray-200" />
                    )}
                />

                <Button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition disabled:opacity-50">
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>
            </form>
        </div>
    );
};