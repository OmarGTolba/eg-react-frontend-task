import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";


import { profileSchema } from "../../shared/utils/validation";
import { Input } from "../../shared/components/Input";
import { clearError } from "../../store/authSlice";
import { Button } from "../../shared/components/Button";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/reduxHooks";
import { deleteAccount, fetchUserProfile, updateProfile } from "../../store/userSlice";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector(state => state.user);
  const [editing, setEditing] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: { firstName: "",lastName: "", email: ""},
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
        console.log(profile);
        
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      });
    }
  }, [profile, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
       const trimmedData = {
      ...data,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
    };

    await dispatch(updateProfile({ id: profile!._id, data: trimmedData })).unwrap();
    toast.success("Profile updated successfully!");
    setEditing(false);
    } catch {
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await dispatch(deleteAccount(profile!._id)).unwrap();
        toast.success("Account deleted successfully!");
      } catch {
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">My Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input
              label="First Name"
              {...field}
              disabled={!editing}
              error={errors.firstName?.message}
            />
          )}
        />

    <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input
              label="last Name"
              {...field}
              disabled={!editing}
              error={errors.lastName?.message}
            />
          )}
        />


        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="Email"
              type="email"
              {...field}
              disabled={!editing}
              error={errors.email?.message}
            />
          )}
        />

       

      
        <div className="flex gap-3 justify-end mt-4">
          {!editing && (
            <Button type="button" onClick={() => setEditing(true)} className="bg-blue-500 hover:bg-blue-600">
              Edit
            </Button>
          )}

          {editing && (
            <>
              <Button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600">
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" onClick={() => { setEditing(false); }} className="bg-gray-300 hover:bg-gray-400 text-gray-800">
                Cancel
              </Button>
            </>
          )}

          <Button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
            Delete Account
          </Button>
        </div>
      </form>
    </div>
  );
};
