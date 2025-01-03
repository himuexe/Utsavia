import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import {
  FaShoppingCart,
  FaSignInAlt,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaCog,
  FaBox,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAppContext } from "../contexts/AppContext";
import useLocation from "../hooks/useLocation";
const slideVariants = {
  initial: { x: "100%" },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.2,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.2,
    },
  },
};

const SidePanel = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence mode="wait">
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40"
          onClick={onClose}
        />
        <motion.div
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed top-0 right-0 w-72 h-full 
          bg-gradient-to-br from-[#121212] via-[#1E1E1E] to-[#2C2C2E]
          z-50 shadow-2xl p-6 flex flex-col
          border-l border-vibrant-magenta/20"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-golden-yellow">{title}</h2>
            <button
              onClick={onClose}
              className="text-electric-blue hover:text-vibrant-magenta transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { isLoggedIn, showToast } = useAppContext();
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);
  const { userLocation, isLoadingLocation, locationError, getUserLocation } =
    useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const signOutMutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      setIsProfilePanelOpen(false);
      setIsMenuOpen(false);
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = useCallback(() => {
    signOutMutation.mutate();
  }, [signOutMutation]);

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.95 },
  };

  const NavigationButton = React.memo(
    ({ icon: Icon, children, to, onClick }) => (
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="transition-all duration-300"
      >
        {to ? (
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
        ) : (
          <button
            onClick={onClick}
            className="flex items-center gap-2 
          text-golden-yellow hover:text-vibrant-magenta 
          px-3 py-2 rounded-md w-full
          transition-all duration-300 
          hover:bg-deep-purple/30 
          font-medium tracking-wider"
            disabled={onClick === handleSignOut && signOutMutation.isLoading}
          >
            {Icon && <Icon className="mr-2 text-electric-blue" />}
            {onClick === handleSignOut && signOutMutation.isLoading
              ? "Signing Out..."
              : children}
          </button>
        )}
      </motion.div>
    )
  );

  const CompanyLogo = React.memo(() => (
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
  ));

  const CartButton = React.memo(() => (
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
  ));

  const ProfileButton = React.memo(() => (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={() => setIsProfilePanelOpen(true)}
      className="relative p-2 rounded-full 
      hover:bg-deep-purple/20 
      transition-all duration-300"
    >
      <FaUser
        className="text-golden-yellow hover:text-vibrant-magenta 
        text-xl transition-colors"
      />
    </motion.button>
  ));

  const navigationItems = isLoggedIn ? (
    <>
      <NavigationButton icon={FaUser} to="/profile">
        Your Profile
      </NavigationButton>
      <NavigationButton icon={FaBox} to="/orders">
        Orders
      </NavigationButton>
      <NavigationButton icon={FaShoppingCart} to="/cart">
        Cart Items ({cartItemCount})
      </NavigationButton>
      <NavigationButton icon={FaCog} to="/settings">
        Settings
      </NavigationButton>
      <NavigationButton icon={FaSignOutAlt} onClick={handleSignOut}>
        Sign Out
      </NavigationButton>
    </>
  ) : (
    <NavigationButton icon={FaSignInAlt} to="/login">
      Login
    </NavigationButton>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        bg-[#121212] text-light-text
        py-4 px-6 sticky top-0 z-40 
        shadow-2xl border-b border-vibrant-magenta/50
      "
    >
      <div className="container mx-auto flex justify-between items-center">
        <CompanyLogo />

        <nav className="hidden md:flex space-x-4 items-center font-secondary">
          <NavigationButton
            icon={FaMapMarkerAlt}
            onClick={() => setIsLocationPanelOpen(true)}
          >
            {isLoadingLocation
              ? "Getting location..."
              : userLocation || "Location"}
          </NavigationButton>

          {isLoggedIn ? (
            <ProfileButton />
          ) : (
            <NavigationButton icon={FaSignInAlt} to="/login">
              Login
            </NavigationButton>
          )}

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

      <SidePanel
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Menu"
      >
        <div className="space-y-2">
          <NavigationButton
            icon={FaMapMarkerAlt}
            onClick={() => setIsLocationPanelOpen(true)}
          >
            {isLoadingLocation
              ? "Getting location..."
              : userLocation || "Location"}
          </NavigationButton>
          {navigationItems}
        </div>
      </SidePanel>

      <SidePanel
        isOpen={isProfilePanelOpen && !isMenuOpen}
        onClose={() => setIsProfilePanelOpen(false)}
        title="Your Account"
      >
        <div className="space-y-2">{navigationItems}</div>
      </SidePanel>
      <SidePanel
        isOpen={isLocationPanelOpen}
        onClose={() => setIsLocationPanelOpen(false)}
        title="Your Location"
      >
        <div className="space-y-4">
          <div className="text-golden-yellow">
            <p className="mb-2">Current Location:</p>
            <p className="text-xl font-bold">
              {isLoadingLocation
                ? "Getting location..."
                : userLocation || "Location not found"}
            </p>
          </div>
          <button
            onClick={getUserLocation}
            className="w-full px-4 py-2 
          bg-deep-purple/30 
          text-electric-blue 
          rounded-md 
          hover:bg-deep-purple/50 
          transition-colors"
          >
            Update Location
          </button>
        </div>
      </SidePanel>
    </motion.header>
  );
};

export default Header;
