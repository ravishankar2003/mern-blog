import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white sm:py-5 py-3 mt-10 w-screen">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-3">
        
        <p className="text-center sm:text-left">Welcome to the Blog!</p>
        
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
            <FaGithub size={24} />
          </a>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
