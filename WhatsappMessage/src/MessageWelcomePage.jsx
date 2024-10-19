import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MessageWelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md text-center">
        <div className="text-green-500 text-6xl mb-6">
          <FaWhatsapp />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to WhatsApp!</h1>
        <p className="text-gray-600 mb-6">Start chatting and stay connected with your loved ones through WhatsApp messaging.</p>
        <Link to="/MainMessage"><button className="bg-green-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out">
          Get Started
        </button></Link>
      </div>
    </div>
  );
}

export default MessageWelcomePage;
