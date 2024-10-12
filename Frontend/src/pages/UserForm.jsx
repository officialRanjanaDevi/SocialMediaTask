import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({ name: "", socialMedia: "" });
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Pending");
    
    // Create a FormData object to send the images and other data
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("socialMedia", credentials.socialMedia);

    // Append each file to FormData
    Array.from(images).forEach((file) => {
      formData.append("images", file);

    });

    try {
      const response = await fetch("https://social-media-task-dt4u.vercel.app/user", {
        method: 'POST',
         headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
        body: formData,
      });
      
      if (!response.ok) {
        const errordata=await response.text();
        console.log("inside response.!ok",errordata);
        
        throw new Error('Network response was not ok');
      }

      const res = await response.json(); // Expecting JSON response
      console.log(res);
      setStatus("Success");
      setCredentials({ name: "", socialMedia: "" }); // Reset fields
      setImages([]); // Reset images
      setTimeout(() => {
        setStatus(""); // Reset status after timeout
      }, 2000);

    } catch (error) {
      console.error("Error during uploading:", error);
      setStatus("Failed");
      setTimeout(() => setStatus(""), 3000); // Reset status after timeout
      setCredentials({ name: "", socialMedia: "" }); // Reset fields
      setImages([]); // Reset images
    } 
  };
  
  const onChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "images") {
      setImages(Array.from(files)); // Set the selected files in the state
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
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
        className="text-center alert bg-sky-500 w-1/2 mx-auto text-white rounded-md"
        role="alert"
        style={{ display: status === "Success" ? "" : "none" }}
      >
        <h1 className="font-bold">Upload Success</h1>
      </div>

      {/* Failed Alert */}
      <div
        className="text-center alert bg-neutral-100 w-1/2 mx-auto text-black rounded-md"
        role="alert"
        style={{ display: status === "Failed" ? "" : "none" }}
      >
        <h1 className="font-bold">Oops, failed</h1>
        Please upload again.
      </div>

      {/* Form */}
      <form
       action='/user'
        onSubmit={handleSubmit}
        method="post" encType="multipart/form-data"

        className="bg-neutral-50 mx-auto w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md mt-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            name="name"
            onChange={onChange}
            placeholder="Enter your name"
            type="text"
            value={credentials.name}
            required
            className="bg-neutral-100 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="socialMedia"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Social Media Handle
          </label>
          <input
            name="socialMedia"
            onChange={onChange}
            placeholder="Enter your social media handle"
            type="text"
            value={credentials.socialMedia}
            required
            className="bg-neutral-100 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Images
          </label>
          <input
            name="images"
            onChange={onChange}
            type="file"
            multiple
            required
            className="bg-neutral-100 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
<div className='text-center mt-12'>
<button className="bg-black  text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
onClick={()=>{navigate('/admin')}}
            >Admin Login</button>
</div>
      
    </div>
  )
}

export default UserForm;
