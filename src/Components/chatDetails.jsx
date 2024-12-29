import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatDetails = ({ chatId }) => {
  const [chat, setChat] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await axios.get(
          `https://backendpingpal.onrender.com/api/chat/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in local storage
            },
          }
        );
        setChat(response.data.chat);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();
  }, [chatId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Chat Details
      </h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Participants</h3>
        <ul className="space-y-2 mt-2">
          {chat.participants.map((participant) => (
            <li key={participant._id} className="flex justify-between items-center">
              <span className="text-gray-600">{participant.name}</span>
              <span className="text-gray-500 text-sm">{participant.email}</span>
              <span
                className={`px-2 py-1 text-xs rounded-md ${
                  participant.status === "online" ? "bg-green-200" : "bg-gray-200"
                }`}
              >
                {participant.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700">Messages</h3>
        <div className="space-y-2 mt-2">
          {chat.messages.length === 0 ? (
            <div className="text-gray-500">No messages yet</div>
          ) : (
            chat.messages.map((message) => (
              <div key={message.timestamp} className="flex flex-col mb-4">
                <span className="font-semibold text-gray-800">{message.sender.name}</span>
                <p className="text-gray-600">{message.content}</p>
                <span className="text-xs text-gray-400">{new Date(message.timestamp).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
