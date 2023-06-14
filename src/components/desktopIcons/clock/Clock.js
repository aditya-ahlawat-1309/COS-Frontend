import React, { useEffect, useState } from "react";
import "./Clock.css"; // Import the CSS file for styling

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const hour = time.getHours() % 12 || 12;
  const minutes = time.getMinutes();
  const period = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="time-container">
      <div className="hour">{hour}</div>
      <div className="minutes">
        :{minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
      </div>
      <div className="period">{period}</div>
    </div>
  );
};

export default Clock;
