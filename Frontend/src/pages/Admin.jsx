import React, { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';

const Admin = () => {
  const [userData, setUserData] = useState([]); // Initialize to an empty array
  const [error, setError] = useState(null); // To handle any errors

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:4000/admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      const response = await res.json();
      setUserData(response || []); // Assuming response is an array of users
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load users. Please try again later.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1 className='font-black text-3xl text-white text-center p-4'>Admin Dashboard</h1>
      {error && <p className="text-center text-red-500">{error}</p>} 
      {userData.length > 0 ? (
        userData.map((user, index) => (
          <div key={index}>
            <UserCard data={user} />
          </div>
        ))
      ) : (
        !error && <p className="text-center text-white">No users found.</p>
      )}
    </div>
  );
}

export default Admin;
