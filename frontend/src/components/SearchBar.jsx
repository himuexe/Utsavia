import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const ResponsiveSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Packages");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSearch = () => {
    console.log({ searchTerm, category });
    setIsMobileMenuOpen(false);
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.95 },
  };

  // Desktop Version
  const DesktopSearchBar = () => (
    <motion.div
      className="
        bg-[#121212]
        rounded-xl shadow-lg overflow-hidden my-8
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-[2fr_1fr_auto] items-center gap-4 p-6">
        {/* Search Input */}
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative w-full">
            <FaSearch
              className={`
              absolute left-4 top-1/2 transform -translate-y-1/2 
              text-electric-blue
            `}
            />
            <input
              type="text"
              placeholder="Search festivals, events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full pl-12 pr-4 py-3 
                bg-[#2C2C2E] text-light-text border-transparent focus:border-electric-blue
                rounded-lg border
                transition duration-300
              "
            />
          </div>
        </motion.div>

        {/* Category Dropdown */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            <FaFilter
              className={`
              absolute left-4 top-1/2 transform -translate-y-1/2 
              text-electric-blue
            `}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`
                w-full pl-12 pr-4 py-3 
                bg-[#2C2C2E] text-light-text border-transparent focus:border-electric-blue
                rounded-lg border
                transition duration-300 
                appearance-none
              `}
            >
              <option value="Packages">Packages</option>
              <option value="Events">Events</option>
              <option value="Materials">Materials</option>
            </select>
          </div>
        </motion.div>

        {/* Search Button */}
        <motion.button
          onClick={handleSearch}
          className={`
            px-6 py-3 
            bg-vibrant-magenta text-white hover:bg-electric-blue
            rounded-lg 
            transition duration-300 
            flex items-center justify-center 
            font-secondary font-medium
          `}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaSearch className="mr-2" />
          Search
        </motion.button>
      </div>
    </motion.div>
  );

  // Mobile Version
  const MobileSearchBar = () => (
    <motion.div
      className={`
      w-full 
      bg-[#1E1E1E]
      rounded-xl shadow-lg my-8
    `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Mobile Search Trigger */}
      <div className="flex items-center p-6">
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mr-4"
          variants={buttonVariants}
          whileTap="tap"
        >
          {isMobileMenuOpen ? (
            <FaTimes
              className={`
              text-2xl 
              text-vibrant-magenta
            `}
            />
          ) : (
            <FaBars
              className={`
              text-2xl 
              text-electric-blue
            `}
            />
          )}
        </motion.button>

        <div className="flex-grow relative">
          <FaSearch
            className={`
            absolute left-4 top-1/2 transform -translate-y-1/2 
            text-electric-blue
          `}
          />
          <input
            type="text"
            placeholder="Search festivals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full pl-12 pr-4 py-3 
              bg-[#2C2C2E] text-light-text border-transparent focus:border-electric-blue
              rounded-lg border
              transition duration-300
            `}
          />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#1E1E1E]"
          >
            <div className="p-6 space-y-6">
              {/* Category Dropdown */}
              <div className="relative">
                <label className="block text-sm text-light-text mb-2">
                  Category
                </label>
                <div className="relative">
                  <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-electric-blue" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 
                    bg-[#2C2C2E] text-light-text 
                    rounded-lg border border-transparent 
                    focus:border-electric-blue 
                    transition duration-300 
                    appearance-none"
                  >
                    <option value="Packages">Packages</option>
                    <option value="Events">Events</option>
                    <option value="Materials">Materials</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                onClick={handleSearch}
                className="w-full py-3 
                bg-vibrant-magenta text-white 
                rounded-lg 
                hover:bg-electric-blue 
                transition duration-300 
                flex items-center justify-center 
                font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSearch className="mr-2" />
                Search
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return isMobile ? <MobileSearchBar /> : <DesktopSearchBar />;
};

export default ResponsiveSearchBar;