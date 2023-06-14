import React, { useEffect, useState } from "react";
import "./Ram.css"
const RamUsage = () => {
  const [ramUsage, setRamUsage] = useState(0);

  useEffect(() => {
    const updateRamUsage = () => {
      if (window.performance && window.performance.memory) {
        const { usedJSHeapSize } = window.performance.memory;
        const ramUsageInMB = Math.round(usedJSHeapSize / 1024 / 1024);
        setRamUsage(ramUsageInMB);
      }
    };

    updateRamUsage();

    const ramUsageInterval = setInterval(updateRamUsage, 1000); // Update the RAM usage every second

    return () => {
      clearInterval(ramUsageInterval);
    };
  }, []);

  return (
    <div className="ram-container">
      <p>Ram Usage {ramUsage} MB</p>
    </div>
  );
};

export default RamUsage;
