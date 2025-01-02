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
          className="border border-golden-yellow rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
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
          className="border border-golden-yellow rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
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
    </motion.form>
  );
};

export default SignIn;