import React, { useState } from "react";
import Clock from "../components/desktopIcons/clock/Clock";
import Menubar from "../components/menubar/Menubar";
import Taskbar from "../components/taskbar/Taskbar";
import Folder from "../folder/Folder";
import "./Desktop.css";
import Weather from "../components/desktopIcons/weatherApp/Weather";

const Desktop = () => {
  const [selectedOption, setSelectedOption] = useState("App-header-option1");

  const handleOptionChange = (option) => {
    console.log(option);
    setSelectedOption(option);
  };

  return (
    <div className="App">
      <header className={selectedOption}>
        <Menubar handleOptionChange={handleOptionChange} />
        {/* Rest of the code */}
        <Folder />
        {/* <Clock />
        <Weather /> */}
        <Taskbar />
      </header>
    </div>
  );
};

export default Desktop;
