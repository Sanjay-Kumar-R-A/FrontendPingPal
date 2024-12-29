import React, { useState } from "react";
import axios from "axios";

const CreateChat = () => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset success/error messages
    setError("");
    setSuccess("");

    if (!senderId || !receiverId || !message) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://backendpingpal.onrender.com/api/chat/create",
        {
          senderId,
          receiverId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in local storage
          },
        }
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Create a New Chat
      </h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="senderId" className="block text-gray-700 font-semibold">
            Sender ID
          </label>
          <input
            type="text"
            id="senderId"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your sender ID"
          />
        </div>

        <div>
          <label htmlFor="receiverId" className="block text-gray-700 font-semibold">
            Receiver ID
          </label>
          <input
            type="text"
            id="receiverId"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter receiver's ID"
          />
        </div>

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
          Create Chat
        </button>
      </form>
    </div>
  );
};

export default CreateChat;
