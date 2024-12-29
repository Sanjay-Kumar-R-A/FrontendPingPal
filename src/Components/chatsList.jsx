import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ChatsList = ({ userId }) => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `https://backendpingpal.onrender.com/api/chat/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in local storage
            },
          }
        );
        setChats(response.data.chats);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Your Chats
      </h2>

      {chats.length === 0 ? (
        <div className="text-center text-gray-500">No chats found</div>
      ) : (
        <ul className="space-y-4">
          {chats.map((chat) => (
            <li
              key={chat._id}
              className="border-b border-gray-200 pb-4 flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-800">
                  {chat.participants[0]?.name}{" "}
                  {chat.participants[1]?.name && `& ${chat.participants[1]?.name}`}
                </span>
                <span className="text-gray-600 text-sm">
                  {chat.messages.length > 0
                    ? chat.messages[chat.messages.length - 1].content
                    : "No messages yet"}
                </span>
              </div>

              <Link
                to={`/chat/${chat._id}`}
                className="text-blue-500 hover:underline"
              >
                View Chat
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatsList;
