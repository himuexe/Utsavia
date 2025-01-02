import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });

      await queryClient.invalidateQueries("validateToken");

      navigate("/");
    },

    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <motion.form
      className="flex flex-col gap-8 bg-[#121212] text-white p-12 rounded-lg shadow-lg"
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vibrant-magenta via-electric-blue to-golden-yellow">
        Create an Account
      </h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-golden-yellow text-sm font-bold flex-1">
          First Name
          <input
            className="border border-golden-yellow rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
            placeholder="Enter your first name"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-golden-yellow text-sm font-bold flex-1">
          Last Name
          <input
            className="border border-golden-yellow rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
            placeholder="Enter your last name"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-golden-yellow text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border border-golden-yellow rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <motion.button
          type="submit"
          className="bg-vibrant-magenta text-white p-2 font-bold hover:bg-electric-blue text-xl rounded transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Account
        </motion.button>
      </span>
    </motion.form>
  );
};

export default Register;
