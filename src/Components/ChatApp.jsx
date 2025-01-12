import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../Services/api";

const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("online"); // User status (online/offline)
  const [groupName, setGroupName] = useState(""); // Group name for creating a new group
  const [groupMembers, setGroupMembers] = useState([]); // Members to add to the group
  const [groupChats, setGroupChats] = useState([]); // List of group chats

  const loggedInUserEmail = localStorage.getItem("email");

  // Fetch users on component mount (exclude logged-in user)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://backendpingpal.onrender.com/api/chat/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const filteredUsers = response.data.users.filter(
          (user) => user.email !== loggedInUserEmail
        );
        setUsers(filteredUsers);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Create a new group
  const handleCreateGroup = async () => {
    if (!groupName || groupMembers.length === 0) {
      alert("Please provide a group name and add at least one member.");
      return;
    }

    try {
      const response = await axios.post(
        "https://backendpingpal.onrender.com/api/chat/create",
        {
          name: groupName,
          adminEmail: loggedInUserEmail,
          memberEmails: groupMembers,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setGroupChats([...groupChats, response.data.group]);
      setGroupName("");
      setGroupMembers([]);
    } catch (error) {
      console.error(error);
    }
  };

  // Select a user or group
  const selectUserOrGroup = (item) => {
    setSelectedUser(item);
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || media) {
      setMessages([
        ...messages,
        {
          sender: "you",
          text: newMessage,
          media: media ? URL.createObjectURL(media) : null,
          timestamp: "Now",
        },
      ]);
      setNewMessage("");
      setMedia(null);
    }
  };

  const handleMediaUpload = (event) => {
    if (event.target.files.length > 0) {
      setMedia(event.target.files[0]);
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Users</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search users"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className={`flex items-center px-4 py-2 cursor-pointer ${
                selectedUser?._id === user._id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => selectUserOrGroup(user)}
            >
              <img
                src={user.profileImage || "./img/avatar.jpg"}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="flex-1">
                <span className="block font-semibold">{user.name}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
              <span
                className={`text-sm font-medium ${
                  user.status === "online" ? "text-green-500" : "text-gray-500"
                }`}
              >
                {user.status === "online" ? "Online" : "Offline"}
              </span>
            </li>
          ))}
          <li
            key="group-create"
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => alert("Select users to create a group")}
          >
            <div className="flex-1">
              <span className="block font-semibold">Create a Group</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">
            {selectedUser?.name || "Group Chat"}
          </h2>
          <span className="text-sm text-gray-500">{selectedUser?.email}</span>
          <div className="mt-2">
            <span>Status: </span>
            <button
              className={`px-3 py-1 rounded-lg ${
                status === "online" ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => handleStatusChange("online")}
            >
              Online
            </button>
            <button
              className={`ml-2 px-3 py-1 rounded-lg ${
                status === "offline" ? "bg-gray-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => handleStatusChange("offline")}
            >
              Offline
            </button>
          </div>
        </div>

        {selectedUser ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "you" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.sender === "you"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{message.text}</p>
                    {message.media && (
                      <img
                        src={message.media}
                        alt="Media"
                        className="mt-2 w-40 h-auto rounded-lg"
                      />
                    )}
                    <span className="text-xs text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center p-4 border-t bg-gray-50">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <label className="ml-2 cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*,audio/*,pdf/*,application/pdf"
                  className="hidden"
                  onChange={handleMediaUpload}
                />
                <div className="px-3 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
                  📎
                </div>
              </label>
              <button
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a user or Group to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
