import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks";
import { resetPassword } from "../../../store/authSlice";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";

interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

const schema = yup.object({
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords do not match").required("Confirm your password"),
}).required();

export const ResetPasswordPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.auth);
    const email = (location.state as any)?.email;

    const { control, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
        resolver: yupResolver(schema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    const onSubmit = (data: ResetPasswordFormValues) => {
        dispatch(resetPassword({ email, newPassword: data.password }))
            .unwrap()
            .then(() => navigate("/login"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
                <p className="text-center text-gray-500 mb-4">Enter your new password</p>

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input label="New Password" type="password" {...field} error={errors.password?.message} className="bg-white/40 border border-gray-200" />
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <Input label="Confirm Password" type="password" {...field} error={errors.confirmPassword?.message} className="bg-white/40 border border-gray-200" />
                    )}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>
            </form>
        </div>
    );
};
