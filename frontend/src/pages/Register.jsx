import React from "react";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <motion.form
      className="flex flex-col gap-8 bg-[#121212] text-white p-12 rounded-lg shadow-lg"
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
          />
        </label>
        <label className="text-golden-yellow text-sm font-bold flex-1">
          Last Name
          <input
            className="border border-golden-yellow rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
            placeholder="Enter your last name"
          />
        </label>
      </div>
      <label className="text-golden-yellow text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border border-golden-yellow rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
          placeholder="Enter your email"
        />
      </label>
      <label className="text-golden-yellow text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border border-golden-yellow rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
          placeholder="Enter your password"
        />
      </label>
      <label className="text-golden-yellow text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border border-golden-yellow rounded w-full py-1 px-2 bg-transparent text-white placeholder-golden-yellow"
          placeholder="Confirm your password"
        />
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