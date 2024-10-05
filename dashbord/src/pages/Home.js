import React from 'react';
import Globe from 'react-globe.gl'; // Assuming you're using a library for 3D globe
import { motion } from 'framer-motion';
import Chatbot from '../llms/chatbot';
const Home = () => {
  return (
    <div>
      <header className="bg-gray-900 shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-white">InfoBridge</div>
          <nav className="space-x-4">
            <a href="/global-data" className="text-white hover:text-green-600">Global Data</a>
            <a href="#local-cases" className="text-white hover:text-green-600">Local Case Studies</a>
            <a href="#proposed-solutions" className="text-white hover:text-green-600">Proposed Solutions</a>
            <a href="#interactive-maps" className="text-white hover:text-green-600">3D Interactive Maps</a>
            <a href="#ai-chatbot" className="text-white hover:text-green-600">AI Chatbot</a>
          </nav>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center text-center bg-blue-500 text-white">
        <div className="absolute inset-0">
          <GlobeComponent />
        </div>
        <div className="relative z-10 p-6">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}>
            Welcome to InfoBridge
          </motion.h1>
          <p className="text-lg md:text-xl mb-6">
            Understanding the intersection of climate change and gender inequality.
          </p>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 InfoBridge. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-green-400">Privacy Policy</a>
            <a href="#" className="hover:text-green-400">Contact</a>
          </div>
        </div>
      </footer>
      <Chatbot/>
    </div>
  );
};

const GlobeComponent = () => {
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      showGraticules
      width="100%"
    />
  );
};

export default Home;
