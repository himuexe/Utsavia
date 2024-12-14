import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaGift,
  FaMusic
} from 'react-icons/fa';

const FooterLink = ({ children, href, icon: Icon }) => (
  <motion.a
    href={href}
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 text-yellow-100 hover:text-white 
    transition-all duration-300 group"
  >
    {Icon && <Icon className="text-amber-400 group-hover:text-white transition-colors" />}
    {children}
  </motion.a>
);

const SocialIcon = ({ Icon, href, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative"
      whileHover={{ 
        scale: 1.2,
        rotate: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className="text-3xl text-amber-300 hover:text-white 
        transition-all duration-300 transform hover:rotate-12" />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 
              bg-fuchsia-700 text-white text-xs px-2 py-1 rounded-md shadow-lg"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120
      }
    }
  };

  const socialIcons = [
    { 
      Icon: FaFacebook, 
      href: 'https://facebook.com/utsavia', 
      label: 'Facebook' 
    },
    { 
      Icon: FaInstagram, 
      href: 'https://instagram.com/utsavia', 
      label: 'Instagram' 
    },
    { 
      Icon: FaTwitter, 
      href: 'https://twitter.com/utsavia', 
      label: 'Twitter' 
    },
    { 
      Icon: FaLinkedin, 
      href: 'https://linkedin.com/company/utsavia', 
      label: 'LinkedIn' 
    }
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-700 
        text-white py-16 px-6 overflow-hidden relative"
      aria-label="Utsavia Footer"
    >
      {/* Festive Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 
        opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 bg-yellow-400 w-20 h-20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 bg-green-400 w-24 h-24 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl grid md:grid-cols-4 gap-8 relative z-10">
        {/* Company Branding */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text 
            bg-gradient-to-r from-yellow-400 to-pink-500 font-primary">
            Utsavia
          </h2>
          <p className="text-yellow-100 text-sm leading-relaxed flex items-center gap-2  font-happiness">
            <FaGift className="text-amber-400" />
            Crafting Unforgettable  Experiences
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-yellow-200">Explore</h3>
          <nav className="space-y-3 font-happiness">
            <FooterLink href="/events" icon={FaCalendarAlt}>
              Upcoming Events
            </FooterLink>
            <FooterLink href="/categories" icon={FaMusic}>
              Event Categories
            </FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </nav>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-yellow-200 font-secondary">Connect</h3>
          <div className="space-y-3 font-happiness">
            <FooterLink 
              href="mailto:sharmaslov@gmail.com" 
              icon={FaEnvelope}
            >
              sharmaslov@gmail.com
            </FooterLink>
            <FooterLink 
              href="tel:+919828477222" 
              icon={FaPhoneAlt}
            >
              +91 9828477222
            </FooterLink>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div 
          variants={itemVariants} 
          className="md:col-span-1 flex flex-col space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4 text-yellow-200 font-secondary">Follow Us</h3>
          <div className="flex space-x-6">
            {socialIcons.map(({ Icon, href, label }, index) => (
              <SocialIcon 
                key={index} 
                Icon={Icon} 
                href={href} 
                label={label}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 pt-6 border-t border-purple-700 
          text-center text-yellow-100 text-sm relative z-10"
      >
        <p className="flex items-center justify-center gap-2 font-secondary">
           © {new Date().getFullYear()} Utsavia Technologies Pvt. Ltd. 
        </p>
        <div className="mt-2 space-x-4 font-happiness">
          <a 
            href="/privacy" 
            className="hover:text-white transition-colors text-yellow-100"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            className="hover:text-white transition-colors text-yellow-100"
          >
            Terms of Service
          </a>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;