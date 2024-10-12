import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const UserCard = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "70%",
    height:"60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="p-1 border-2 border-white rounded-md w-5/6 md:w-3/6 my-2 mx-auto bg-white flex justify-between">
      <div className="p-4">
        <h1 className="font-bold text-xl">Name: {data.name}</h1>
        <p className="font-semibold">
          Social Media Handle: @{data.socialMedia}
        </p>
      </div>
      <div className="p-4 flex items-center">
        <button
          className="px-8 text-white font-bold hover:scale-110 py-2 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500"
          onClick={handleOpen}
        >
          Click
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
            <div className="text-center overflow-auto h-full">
              <h1 className="font-bold text-xl">Name: {data.name}</h1>
              <p className="font-semibold">
                Social Media Handle: @{data.socialMedia}
              </p>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-center h-5/6">
                {data.images.map((link, index) => (
                  
                  <img
                    className="m-2 border border-gray-300 rounded "
                    src={link}
                    key={index}
                    alt="alt img"
                    width={200}
                    height={200}
                  />
                ))}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default UserCard;
