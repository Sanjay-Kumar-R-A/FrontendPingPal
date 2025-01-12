import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50">

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Simple, Secure Messaging with PingPal
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Stay connected with your friends and family, anytime, anywhere.
        </p>
        <Link
          to="/register"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-medium hover:bg-green-700 transition duration-300"
        >
          Start Chatting
        </Link>
      </main>

      {/* Features Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <img
              src="./src/img/encrypt.svg"
              alt="Secure Messaging"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              End-to-End Encryption
            </h3>
            <p className="text-gray-600">
              Your messages and calls are completely private.
            </p>
          </div>
          <div>
            <img
              src="./src/img/connect.svg"
              alt="Connect Easily"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Connect with Anyone
            </h3>
            <p className="text-gray-600">
              Seamlessly chat with your friends, family, and colleagues.
            </p>
          </div>
          <div>
            <img
              src="./src/img//free.svg"
              alt="Free to Use"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Completely Free
            </h3>
            <p className="text-gray-600">
              Chat without any hidden costs or ads.
            </p>
          </div>
          <div>
  <img
    src="./src/img/business.svg"
    alt="PingPal Business"
    className="w-16 h-16 mx-auto mb-4"
  />
  <h3 className="text-xl font-semibold text-gray-800 mb-2">
    PingPal Business
  </h3>
  <p className="text-gray-600">
    Collaborate with teams, manage projects, and streamline workflow securely in one platform.
  </p>
</div>
<div>
  <img
    src="./src/img/pay.svg"
    alt="PingPal Pay"
    className="w-16 h-16 mx-auto mb-4"
  />
  <h3 className="text-xl font-semibold text-gray-800 mb-2">
    PingPal Pay
  </h3>
  <p className="text-gray-600">
    Send and receive payments quickly and securely using PingPal Pay within chat app !
  </p>
</div>
<div>
  <img
    src="./src/img/files.svg"
    alt="PingPal File Transfer"
    className="w-16 h-16 mx-auto mb-4"
  />
  <h3 className="text-xl font-semibold text-gray-800 mb-2">
    PingPal File Transfer
  </h3>
  <p className="text-gray-600">
    Share large files without limits with PingPal File Transfer.
  </p>
</div>

        </div>
      </section>
    </div>
  );
};

export default Home;
