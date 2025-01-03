import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: async (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const handleGoogleSignIn = () => {
    apiClient.googleSignIn();
  };

  return (
    <motion.form
      className="flex flex-col gap-8 bg-[#121212] text-white p-12 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vibrant-magenta via-electric-blue to-golden-yellow">
        Sign In
      </h2>

      <label className="text-golden-yellow text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border border-white rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
          placeholder="Enter your email"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-golden-yellow text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border border-white rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
          placeholder="Enter your password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm text-golden-yellow">
          Not Registered?{" "}
          <Link className="underline text-vibrant-magenta" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-vibrant-magenta text-white p-2 font-bold hover:bg-electric-blue text-xl rounded transition-all duration-300"
        >
          Login
        </button>
      </span>
      <div className="relative flex items-center gap-4">
        <div className="flex-grow border-t border-golden-yellow"></div>
        <span className="text-golden-yellow">or</span>
        <div className="flex-grow border-t border-golden-yellow"></div>
      </div>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-2 bg-white text-gray-700 p-2 rounded hover:bg-gray-100 transition-all duration-300"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </button>
    </motion.form>
  );
};

export default SignIn;
