import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-600 mb-4">
          © 2025 PingPal | Built by Sanjay Kumar
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/Sanjay-Kumar-R-A"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition duration-300"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://www.linkedin.com/in/sanjay-kumar-r-a-51222b265/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition duration-300"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="mailto:rasanjaykumarsk@gmail.com"
            className="text-gray-600 hover:text-red-600 transition duration-300"
          >
            <FaEnvelope size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
