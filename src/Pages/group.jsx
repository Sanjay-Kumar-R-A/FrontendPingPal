import React, { useState } from "react";
import axios from "axios";

const GroupManagement = () => {
  const [groupName, setGroupName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [memberIds, setMemberIds] = useState("");
  const [groupId, setGroupId] = useState("");
  const [newMemberId, setNewMemberId] = useState("");
  const [removedMemberId, setRemovedMemberId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [group, setGroup] = useState(null);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!groupName || !adminId || !memberIds) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://backendpingpal.onrender.com/api/group/create",
        {
          name: groupName,
          adminId,
          memberIds: memberIds.split(",").map((id) => id.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess(response.data.message);
      setGroup(response.data.group);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!groupId || !newMemberId) {
      setError("Group ID and new member ID are required");
      return;
    }

    try {
      const response = await axios.put(
        "https://backendpingpal.onrender.com/api/group/add-member",
        {
          groupId,
          memberId: newMemberId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess(response.data.message);
      setGroup(response.data.group);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleRemoveMember = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!groupId || !removedMemberId) {
      setError("Group ID and member ID to remove are required");
      return;
    }

    try {
      const response = await axios.put(
        "https://backendpingpal.onrender.com/api/group/remove-member",
        {
          groupId,
          memberId: removedMemberId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess(response.data.message);
      setGroup(response.data.group);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Group Management
      </h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      {/* Create Group Form */}
      <form onSubmit={handleCreateGroup} className="space-y-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-700">Create a New Group</h3>

        <div>
          <label htmlFor="groupName" className="block text-gray-700 font-semibold">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter group name"
          />
        </div>

        <div>
          <label htmlFor="adminId" className="block text-gray-700 font-semibold">
            Admin ID
          </label>
          <input
            type="text"
            id="adminId"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter admin ID"
          />
        </div>

        <div>
          <label htmlFor="memberIds" className="block text-gray-700 font-semibold">
            Member IDs (comma separated)
          </label>
          <input
            type="text"
            id="memberIds"
            value={memberIds}
            onChange={(e) => setMemberIds(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter member IDs separated by commas"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Group
        </button>
      </form>

      {/* Add Member Form */}
      <form onSubmit={handleAddMember} className="space-y-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-700">Add Member</h3>

        <div>
          <label htmlFor="groupId" className="block text-gray-700 font-semibold">
            Group ID
          </label>
          <input
            type="text"
            id="groupId"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter group ID"
          />
        </div>

        <div>
          <label htmlFor="newMemberId" className="block text-gray-700 font-semibold">
            New Member ID
          </label>
          <input
            type="text"
            id="newMemberId"
            value={newMemberId}
            onChange={(e) => setNewMemberId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter new member ID"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          Add Member
        </button>
      </form>

      {/* Remove Member Form */}
      <form onSubmit={handleRemoveMember} className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Remove Member</h3>

        <div>
          <label htmlFor="groupId" className="block text-gray-700 font-semibold">
            Group ID
          </label>
          <input
            type="text"
            id="groupId"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter group ID"
          />
        </div>

        <div>
          <label htmlFor="removedMemberId" className="block text-gray-700 font-semibold">
            Member ID to Remove
          </label>
          <input
            type="text"
            id="removedMemberId"
            value={removedMemberId}
            onChange={(e) => setRemovedMemberId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter member ID to remove"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Remove Member
        </button>
      </form>
    </div>
  );
};

export default GroupManagement;
