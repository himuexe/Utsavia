import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaRing 
} from 'react-icons/fa';

const ServiceCard = ({ icon: Icon, title, description, gradient, route }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-[#121212] text-light-text"
      initial={{ 
        opacity: 0, 
        y: 50,
        rotateX: 30
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX: 0
      }}
      transition={{ 
        type: 'tween',
        duration: 0.5,
        ease: 'easeOut'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        transition: { duration: 0.3 }
      }}
      onClick={handleCardClick}
      onTap={() => setIsHovered(!isHovered)}
      onHoverStart={() => setIsHovered(true)}
      onHoverLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background with Parallax Effect */}
      <motion.div 
        className={`absolute inset-0 opacity-80 ${gradient}`}
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 2 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card Content */}
      <div className="relative z-10 p-6 h-full flex flex-col items-center">
        {/* Icon and Title Container */}
        <div className="flex flex-col items-center space-y-4 mb-4 w-full">
          <motion.div
            animate={{ 
              translateY: isHovered ? -10 : 0,
              rotate: isHovered ? -15 : 0
            }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 10
            }}
            className="flex justify-center w-full"
          >
            <Icon className="text-4xl text-golden-yellow transform transition-transform" />
          </motion.div>
          
          <motion.h3 
            className="text-2xl font-bold text-golden-yellow font-secondary text-center"
            animate={{
              scale: isHovered ? 1.05 : 1,
              opacity: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
        </div>

        {/* Description - Always Visible on Mobile, Animated on Desktop */}
        <div className="w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { 
                opacity: 0, 
                y: 20,
                height: 0
              },
              visible: { 
                opacity: 1, 
                y: 0,
                height: 'auto',
                transition: {
                  duration: 0.4,
                  delayChildren: 0.2,
                  staggerChildren: 0.1
                }
              }
            }}
            className={`overflow-hidden text-center 
              ${isHovered ? 'block' : 'md:hidden'}`}
          >
            {description.split(' ').map((word, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="inline-block mr-2 text-yellow-100 text-sm font-happiness"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Hover Indicator with Diagonal Movement */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-golden-yellow"
          initial={{ width: '0%', x: '-100%' }}
          animate={{ 
            width: isHovered ? '100%' : '0%',
            x: isHovered ? 0 : '-100%'
          }}
          transition={{ 
            type: 'spring',
            stiffness: 250,
            damping: 20
          }}
        />
      </div>
    </motion.div>
  );
};

const ServicesSubHeader = () => {
  const services = [
    {
      icon: FaHome,
      title: 'Inhouse',
      description: 'Discover our curated inhouse experiences tailored for unforgettable moments.',
      gradient: 'bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-700',
      route: '/inhouse'
    },
    {
      icon: FaBuilding,
      title: 'Apartments',
      description: 'Luxurious and comfortable apartments designed for your perfect stay.',
      gradient: 'bg-gradient-to-br from-fuchsia-800 via-pink-700 to-red-600',
      route: '/apartments'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Our Location',
      description: 'Explore our prime locations strategically positioned for convenience and beauty.',
      gradient: 'bg-gradient-to-br from-pink-700 via-red-600 to-orange-500',
      route: '/location'
    },
    {
      icon: FaRing,
      title: 'Wedding',
      description: 'Create magical wedding experiences with our comprehensive event planning.',
      gradient: 'bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400',
      route: '/wedding'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      className="py-8 bg-[#121212]"
    >
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSubHeader;