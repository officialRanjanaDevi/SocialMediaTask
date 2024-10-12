import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Pending");
    try {
      const email=localStorage.getItem('email');
      const password=localStorage.getItem('password');
      if(credentials.email==="admin@gmail.com" && credentials.password==="admin"){
         localStorage.setItem("isLoggedIn",true);
          setStatus("Success");
          navigate('/admin')
      }else{
        setStatus("Failed")
        setTimeout(() => setStatus(null), 3000);
        setCredentials({ email: "", password: "" });
      }     
    } catch (error) {
      console.error("Error during login:", error);
      setStatus("Failed");
      setTimeout(() => setStatus(null), 3000);
      setCredentials({ email: "", password: "" });
    } 
  };
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-20">
      {/* Loader for Pending Status */}
      <div className="mx-auto flex flex-col items-center" style={{ display: status === "Pending" ? "" : "none" }}>
        <div className="loader"></div>
        <p>Please wait..</p>
      </div>
      
      {/* Success Alert */}
      <div
        className="text-center alert bg-neutral-100 w-1/2 mx-auto text-white rounded-md"
        role="alert"
        style={{ display: status === "Success" ? "" : "none" }}
      >
        <h1 className="font-bold">Login Success</h1>
      </div>

      {/* Failed Alert */}
      <div
        className="text-center alert bg-neutral-100 w-1/2 mx-auto text-black rounded-md"
        role="alert"
        style={{ display: status === "Failed" ? "" : "none" }}
      >
        <h1 className="font-bold">Oops, login failed</h1>
        Please try again.
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-50 mx-auto w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md mt-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            name="email"
            onChange={onChange}
            placeholder="Enter your email"
            type="email"
            value={credentials.email}
            required
            className="bg-neutral-100  shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            name="password"
            onChange={onChange}
            placeholder="Enter your password"
            type="password"
            value={credentials.password}
            required
          
            className="bg-neutral-100 shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            
          />
        </div>

        <div className="flex flex-col items-center justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        
        </div>
      </form>
    </div>
  );
};

export default Login;
