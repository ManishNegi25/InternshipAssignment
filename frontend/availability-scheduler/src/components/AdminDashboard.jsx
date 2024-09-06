import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    axios
      .get(`http://localhost:5000/api/admin/availability/${user._id}`)
      .then((response) => {
        setAvailability(response.data);
      });
  };

  const handleScheduleSession = (slot) => {
    const session = {
      user: selectedUser._id,
      start: slot.start,
      end: slot.end,
      type: "one-on-one",
    };

    axios
      .post("http://localhost:5000/api/admin/schedule", session, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      })
      .then(() => {
        alert("Session scheduled successfully!");
        fetchSessions();
      })
      .catch((error) => {
        console.error("Error scheduling session:", error);
        alert("Error scheduling session: " + error.message);
      });
  };

  const handleDeleteSession = (sessionId) => {
    axios
      .delete(`http://localhost:5000/api/admin/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      })
      .then(() => {
        alert("Session deleted successfully!");
        fetchSessions();
      })
      .catch((error) => {
        console.error("Error deleting session:", error);
        alert("Error deleting session: " + error.message);
      });
  };

  const fetchSessions = () => {
    if (selectedUser) {
      axios
        .get(`http://localhost:5000/api/admin/sessions?userId=${selectedUser._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        })
        .then((response) => {
          setSessions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sessions:", error);
        });
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [selectedUser]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-8 transition duration-500 hover:shadow-3xl transform hover:-translate-y-1">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Select User
            </h3>
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="p-3 border rounded-md cursor-pointer hover:bg-blue-100 transition duration-300"
                  onClick={() => handleUserSelect(user)}
                >
                  {user.email}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              User Availability
            </h3>
            {availability.length ? (
              availability.map((slot) => (
                <div
                  key={slot._id}
                  className="p-4 border-l-4 border-green-500 rounded-md mb-3 bg-white shadow-sm hover:shadow-md transition duration-200"
                >
                  <p className="text-gray-700 font-semibold mb-2">
                    {slot.start} to {slot.end}
                  </p>
                  <button
                    onClick={() => handleScheduleSession(slot)}
                    className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-md hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition duration-200"
                  >
                    Schedule Session
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Select a user to view availability.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Scheduled Sessions</h3>
          {sessions.length ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className="p-4 border-l-4 border-red-500 rounded-md mb-3 bg-white shadow-sm hover:shadow-md transition duration-200"
              >
                <p className="text-gray-700 font-semibold mb-2">
                  {session.start} to {session.end}
                </p>
                <button
                  onClick={() => handleDeleteSession(session._id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-bold rounded-md hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition duration-200"
                >
                  Delete Session
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No scheduled sessions.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
