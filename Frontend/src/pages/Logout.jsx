import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); 
  const handleLogout = async () => {
    localStorage.clear();
    console.log(localStorage);
    navigate("/");
  };
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
