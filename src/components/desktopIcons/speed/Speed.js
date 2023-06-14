import React, { useEffect, useState } from "react";
import "./Speed.css"
const DataSpeed = () => {
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    const updateSpeed = () => {
      if (navigator.connection) {
        setSpeed(navigator.connection.downlink + " Mbps");
      } else {
        setSpeed("Unavailable");
      }
    };

    updateSpeed();

    const speedInterval = setInterval(updateSpeed, 1000); // Update the speed every second

    return () => {
      clearInterval(speedInterval);
    };
  }, []);

  return (
    <div className="speed-container">
      <p>Data Speed {speed}</p>
    </div>
  );
};

export default DataSpeed;
