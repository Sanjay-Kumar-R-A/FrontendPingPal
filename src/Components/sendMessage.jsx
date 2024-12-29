import React, { useState } from "react";
import axios from "axios";

const SendMessage = ({ chatId, senderId }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Reset success/error messages
    setError("");
    setSuccess("");

    if (!message) {
      setError("Message cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "https://backendpingpal.onrender.com/api/chat/sendMessage",
        {
          chatId,
          senderId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in local storage
          },
        }
      );
      setSuccess(response.data.message);
      setMessage(""); // Reset message input field
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Send a Message
      </h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      <form onSubmit={handleSendMessage} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-gray-700 font-semibold">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your message"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
