"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Users = () => {
  const { data: session } = useSession();
  const currentUserEmail = session?.user?.email;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (email, role) => {
    try {
      const res = await fetch("/api/users/updateRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Role updated successfully");
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while updating role");
    }
  };

  if (loading) return <p className="p-6">Loading users...</p>;

 return (
  <div className="p-3 md:p-6">
    <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
      👥 Users Management
    </h1>

    {/* ================= DESKTOP TABLE ================= */}
    <div className="hidden md:block bg-white shadow rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const isAdmin = user.role === "admin";
            const isMe = user.email === currentUserEmail;

            return (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      isAdmin
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {isAdmin ? "Admin" : "User"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {!isAdmin && (
                    <button
                      onClick={() => updateRole(user.email, "admin")}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Make Admin
                    </button>
                  )}

                  {isAdmin && !isMe && (
                    <button
                      onClick={() => updateRole(user.email, "user")}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Remove Admin
                    </button>
                  )}

                  {isAdmin && isMe && (
                    <span className="text-gray-500 text-xs italic">
                      You
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* ================= MOBILE CARD VIEW ================= */}
    <div className="md:hidden space-y-4">
      {users.map((user) => {
        const isAdmin = user.role === "admin";
        const isMe = user.email === currentUserEmail;

        return (
          <div
            key={user._id}
            className="bg-white shadow rounded-lg p-4 space-y-2"
          >
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500 break-all">
                {user.email}
              </p>
            </div>

            <div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  isAdmin
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isAdmin ? "Admin" : "User"}
              </span>
            </div>

            <div>
              {!isAdmin && (
                <button
                  onClick={() => updateRole(user.email, "admin")}
                  className="w-full bg-green-600 text-white py-2 rounded text-xs"
                >
                  Make Admin
                </button>
              )}

              {isAdmin && !isMe && (
                <button
                  onClick={() => updateRole(user.email, "user")}
                  className="w-full bg-red-600 text-white py-2 rounded text-xs"
                >
                  Remove Admin
                </button>
              )}

              {isAdmin && isMe && (
                <p className="text-xs text-gray-500 italic">You</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);


};

export default Users;
