import React from 'react';
import { motion } from 'framer-motion';
import { FaBirthdayCake, FaGlassCheers, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import Birthday from '../assets/birthday.jpg'
import Festival from '../assets/fest.jpg'
import Anniversary from '../assets/anni.jpg'
import Party from '../assets/social.jpg'

const CategoryCard = ({ title, icon: Icon, description, gradient, index, bgImage }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="relative overflow-hidden rounded-xl h-64 cursor-pointer group"
  >
    <img 
      src={bgImage} 
      alt={title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 group-hover:opacity-70 transition-opacity`} />
    <div className="relative h-full z-10 p-6 flex flex-col justify-end">
      <Icon className="text-4xl text-white mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/90">{description}</p>
    </div>
  </motion.div>
);

const Hero = () => {
  const categories = [
    {
      id: 1,
      title: 'Festivals',
      icon: FaGlassCheers,
      description: 'Celebrate cultural festivities',
      gradient: 'from-purple-600/80 to-blue-500/80',
      bgImage: Festival
    },
    {
      id: 2,
      title: 'Birthdays',
      icon: FaBirthdayCake,
      description: 'Make memories special',
      gradient: 'from-pink-500/80 to-rose-500/80',
      bgImage: Birthday
    },
    {
      id: 3,
      title: 'Anniversaries',
      icon: FaCalendarAlt,
      description: 'Honor lasting bonds',
      gradient: 'from-amber-500/80 to-red-500/80',
      bgImage: Anniversary
    },
    {
      id: 4,
      title: 'Society Events',
      icon: FaUsers,
      description: 'Connect with community',
      gradient: 'from-emerald-500/80 to-teal-500/80',
      bgImage: Party
    }
  ];

  return (
    <section className="relative bg-[#121212] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-6 py-16"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-golden-yellow via-electric-blue to-vibrant-magenta bg-clip-text text-transparent">
            Craft Your Perfect Event
          </h1>
          <p className="text-xl text-light-text/80 max-w-2xl mx-auto">
            Transform your special moments into unforgettable memories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              {...category} 
              index={index} 
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;