import React from "react";
import "./BackgroundImage.css"
import wallpaper1 from "../../media/wallpaper.jpg"
import wallpaper2 from "../../media/wallpaper2.jpg";
import wallpaper3 from "../../media/wallpaper3.jpg";

const BackgroundChanger = ({ handleOptionChange, handleCloseDialog }) => {
  const handleButtonClick = (option) => {
    console.log(option)
    handleOptionChange(option);
    // handleCloseDialog();
  };

  return (
    <div className="backgroundChangerDialogMain">
      <button className="subFunctionsButton " onClick={handleCloseDialog}>
        CLOSE
      </button>
      <br />
      <button
        className="backgroundChangerButton"
        onClick={() => handleButtonClick("App-header-option1")}
      >
        <img
          src={wallpaper1}
          className="backgroundChangerImage"
          alt="Option 1"
        />
      </button>
      <button
        className="backgroundChangerButton"
        onClick={() => handleButtonClick("App-header-option2")}
      >
        <img
          src={wallpaper2}
          className="backgroundChangerImage"
          alt="Option 2"
        />
      </button>
      <button
        className="backgroundChangerButton"
        onClick={() => handleButtonClick("App-header-option3")}
      >
        <img
          src={wallpaper3}
          className="backgroundChangerImage"
          alt="Option 3"
        />
      </button>
      {/* Add more options as needed */}
    </div>
  );
};

export default BackgroundChanger;
