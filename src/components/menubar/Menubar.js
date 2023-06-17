import React, { useState, useEffect } from "react";
import EditDialog from "./edit/EditDialog";
import "./Menubar.css";
import NewFolder from "./new/NewFolder";

const Menubar = ({ handleOptionChange }) => {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [chargingStatus, setChargingStatus] = useState("");

  useEffect(() => {
    navigator
      .getBattery()
      .then((battery) => {
        const updateBatteryStatus = () => {
          setBatteryLevel(battery.level * 100);
          setChargingStatus(battery.charging ? "Charging" : "Not Charging");
        };

        battery.addEventListener("levelchange", updateBatteryStatus);
        battery.addEventListener("chargingchange", updateBatteryStatus);

        updateBatteryStatus();
      })
      .catch((error) => {
        console.error("Battery API not supported:", error);
      });
  }, []);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditDialogOpen(!isEditDialogOpen);
  };

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const handleFileClick = () => {
    setIsFileDialogOpen(!isFileDialogOpen);
  };

  //    const [selectedOption, setSelectedOption] = useState("");

  //    const handleOptionChange = (option) => {
  //      console.log(option);
  //      setSelectedOption(option);
  //    };

  //   const handleCloseDialog = () => {
  //     setIsEditDialogOpen(false);
  //   };

  // Rest of the component code

  return (
    <>
      <div className="menubarMain">
        <div className="menuBarButton">
          <button className="logoButtonLeft">SYSTEM HEALTH</button>
          <button className="logoButtonLeft" onClick={handleFileClick}>
            FILE
          </button>
          <button className="logoButtonLeft" onClick={handleEditClick}>
            EDIT
          </button>
        </div>
        <div className="menuBarButtonLogos">
          <button className="sidelogoButton">
            {currentTime.toLocaleTimeString()}
          </button>
        </div>
      </div>
      {isEditDialogOpen && (
        <EditDialog handleOptionChange={handleOptionChange} />
      )}
      {isFileDialogOpen && (
        <NewFolder handleOptionChange={handleOptionChange} />
      )}
    </>
  );
};

export default Menubar;
