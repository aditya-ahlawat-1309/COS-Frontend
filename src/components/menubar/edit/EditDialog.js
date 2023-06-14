import React, { useState } from "react";
import BackgroundChanger from "../../../desktop/backgroundImage/BackgroundImage";
import "./EditDialog.css";

const EditDialog = ({handleOptionChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsOpen(!isOpen);
  };

  



  return (
    <>
      <div className="editDialogMain">
        <button onClick={handleOpenDialog} className="editButton">
          Background
        </button>
      </div>
      {isOpen && (
        <BackgroundChanger
          handleOptionChange={handleOptionChange}
          handleCloseDialog={handleOpenDialog}
        />
      )}
    </>
  );
};

export default EditDialog;
