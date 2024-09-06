import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ManageAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("15:00");
  const [duration, setDuration] = useState(30);
  const [editSessionId, setEditSessionId] = useState(null);

  useEffect(() => {
    const fetchAvailabilityAndSessions = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("User is not logged in or token is missing.");
          return;
        }

        const availabilityResponse = await axios.get(
          "https://internship-assignment-omega.vercel.app/api/availability",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAvailabilities(availabilityResponse.data);

        const sessionsResponse = await axios.get(
          "https://internship-assignment-omega.vercel.app/api/sessions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSessions(sessionsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchAvailabilityAndSessions();
  }, []);

  const handleDeleteSession = (id) => {
    axios
      .delete(`https://internship-assignment-omega.vercel.app/api/sessions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then(() => {
        setSessions(sessions.filter((session) => session._id !== id));
        alert("Session deleted successfully!");
      })
      .catch((error) => console.error("Error deleting session:", error));
  };

  const handleEditSession = (id) => {
    setEditSessionId(id);
  };

  const handleUpdateSession = (id) => {
    const newStart = moment(selectedDate)
      .set({
        hour: parseInt(startTime.split(":")[0], 10),
        minute: parseInt(startTime.split(":")[1], 10),
      })
      .toISOString();
    const newEnd = moment(selectedDate)
      .set({
        hour: parseInt(endTime.split(":")[0], 10),
        minute: parseInt(endTime.split(":")[1], 10),
      })
      .toISOString();
    const newType = prompt("Enter session type:");

    axios
      .put(
        `https://internship-assignment-omega.vercel.app/api/sessions/${id}`,
        { start: newStart, end: newEnd, type: newType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(() => {
        setSessions(
          sessions.map((session) =>
            session._id === id
              ? { ...session, start: newStart, end: newEnd, type: newType }
              : session
          )
        );
        alert("Session updated successfully!");
        setEditSessionId(null);
      })
      .catch((error) => console.error("Error updating session:", error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-8">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Manage Your Availability
        </h2>
      
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Scheduled Sessions
        </h3>
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">Start</th>
              <th className="py-3 px-4 border-b text-left">End</th>
              <th className="py-3 px-4 border-b text-left">Type</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {new Date(session.start).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(session.end).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">{session.type}</td>
                <td className="py-2 px-4 border-b">
                  {editSessionId === session._id ? (
                    <>
                      <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        className="mb-4"
                      />
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="mr-2"
                      />
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="mr-2"
                      />
                      <button
                        onClick={() => handleUpdateSession(session._id)}
                        className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition duration-200"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditSession(session._id)}
                        className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition duration-200 mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteSession(session._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAvailability;
