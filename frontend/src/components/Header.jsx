import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSignInAlt,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);
  const navigate = useNavigate();

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
    tap: { scale: 0.95 },
  };

  const NavigationButton = ({ icon: Icon, children, to }) => (
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="transition-all duration-300"
    >
      <Link
        to={to}
        className="flex items-center gap-2 
        text-golden-yellow hover:text-vibrant-magenta 
        px-3 py-2 rounded-md 
        transition-all duration-300 
        hover:bg-deep-purple/30 
        font-medium tracking-wider"
      >
        {Icon && <Icon className="mr-2 text-electric-blue" />}
        {children}
      </Link>
    </motion.div>
  );

  const CompanyLogo = () => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/")}
      className="cursor-pointer select-none"
    >
      <h1
        className="text-4xl font-bold 
        text-transparent bg-clip-text 
        bg-gradient-to-r from-vibrant-magenta via-electric-blue to-golden-yellow 
        font-primary tracking-tighter"
      >
        Utsavia
      </h1>
    </motion.div>
  );

  const CartButton = () => (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={() => navigate("/cart")}
      className="relative p-2 rounded-full 
      hover:bg-deep-purple/20 
      transition-all duration-300"
    >
      <FaShoppingCart
        className="text-golden-yellow hover:text-vibrant-magenta 
        text-xl transition-colors"
      />
      {cartItemCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 
          bg-vibrant-magenta text-white 
          text-xs rounded-full 
          w-5 h-5 flex items-center justify-center"
        >
          {cartItemCount}
        </motion.span>
      )}
    </motion.button>
  );

  const MobileMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 right-0 w-64 h-full 
          bg-gradient-to-br from-[#121212] via-[#1E1E1E] to-[#2C2C2E]
          z-50 shadow-2xl p-6 flex flex-col space-y-4
          border-l border-vibrant-magenta/20"
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end text-electric-blue hover:text-vibrant-magenta transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>

          <div className="space-y-4 flex flex-col">
            <NavigationButton icon={FaMapMarkerAlt} to="/location">
              Location
            </NavigationButton>

            <NavigationButton icon={FaSignInAlt} to="/login">
              Login
            </NavigationButton>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-all duration-300"
            >
              <Link
                to="/cart"
                className="flex items-center gap-2 
                text-golden-yellow hover:text-vibrant-magenta 
                px-3 py-2 rounded-md 
                transition-all duration-300 
                hover:bg-deep-purple/30"
              >
                <FaShoppingCart className="mr-2 text-electric-blue" />
                Cart ({cartItemCount})
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#121212] text-light-text 
      py-4 px-6 sticky top-0 z-40 
      shadow-2xl border-b border-vibrant-magenta/50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <CompanyLogo />

        <nav className="hidden md:flex space-x-4 items-center font-secondary">
          <NavigationButton icon={FaMapMarkerAlt} to="/location">
            Location
          </NavigationButton>

          <NavigationButton icon={FaSignInAlt} to="/login">
            Login
          </NavigationButton>

          <CartButton />
        </nav>

        <motion.button
          className="md:hidden text-electric-blue"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      <MobileMenu />
    </motion.header>
  );
};

export default Header;