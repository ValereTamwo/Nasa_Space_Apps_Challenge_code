import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the chat window

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Ask me about anything 💬
      </button>

      {isOpen && (
        <motion.div
          className="bg-white rounded-lg shadow-lg mt-2 w-72 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <h3 className="font-bold text-lg mb-2">Welcome to InfoBridge Chat!</h3>
          <p className="mb-4">
            We're here to help you with any questions about the relationship between climate change and gender inequality.
          </p>
          <form>
            <input
              type="text"
              placeholder="Type your question..."
              className="border rounded w-full p-2 mb-2"
            />
            <button
              
              className="bg-blue-600 text-white rounded w-full py-2 hover:bg-blue-700 transition duration-300"
            >
              Send
            </button>
          </form>
          <button
            onClick={toggleChat}
            className="text-red-500 hover:text-red-700 mt-2"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
