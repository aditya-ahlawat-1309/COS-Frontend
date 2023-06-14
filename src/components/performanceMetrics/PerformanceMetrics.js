import React, { useEffect, useState } from "react";
import "./PerformanceMetrics.css"
const PerformanceMetrics = () => {


     const [cpuUsage, setCpuUsage] = useState(0);

     useEffect(() => {
       let startTimestamp;
       let totalTime = 0;
       let iterations = 0;

       const calculateCpuUsage = (timestamp) => {
         if (!startTimestamp) {
           startTimestamp = timestamp;
           return;
         }

         const elapsed = timestamp - startTimestamp;
         startTimestamp = timestamp;

         // Accumulate the total time and count the number of iterations
         totalTime += elapsed;
         iterations++;

         // Calculate the average CPU usage as a percentage
         const averageCpuUsage = (totalTime / iterations / (1000 / 60)) * 100; // Assuming 60 frames per second
         setCpuUsage(averageCpuUsage.toFixed(2));

         // Request the next animation frame
         requestAnimationFrame(calculateCpuUsage);
       };

       const animationFrameId = requestAnimationFrame(calculateCpuUsage);

       return () => {
         cancelAnimationFrame(animationFrameId);
       };
     }, []);


  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkUsage, setNetworkUsage] = useState(0);
  const [systemUptime, setSystemUptime] = useState("");

  useEffect(() => {
    const appStartTime = Date.now();

    const updateMetrics = () => {
      // Retrieve CPU usage

      // Retrieve memory usage
      const memoryUsage = performance.memory.usedJSHeapSize / (1024 * 1024); // Example metric, actual implementation may vary
      setMemoryUsage(memoryUsage.toFixed(2));

      // Retrieve network usage
      const networkUsage = navigator.connection.downlink; // Example metric, actual implementation may vary
      setNetworkUsage(networkUsage.toFixed(2));

      // Calculate system uptime
      const currentTime = Date.now();
      const uptimeInSeconds = Math.floor((currentTime - appStartTime) / 1000);
      const seconds = Math.floor(uptimeInSeconds % 60);
      const minutes = Math.floor((uptimeInSeconds / 60) % 60);
      const hours = Math.floor((uptimeInSeconds / 3600) % 24);
      const days = Math.floor(uptimeInSeconds / 86400);
      const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      setSystemUptime(uptimeString);
    };

    const interval = setInterval(updateMetrics, 1000); // Update metrics every second

    return () => {
      clearInterval(interval);
    };
  }, []);

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

  return (
    <div>

    
      {/* <div className="tile tile-cpu">
        <h5>CPU Usage</h5>
        <p>{cpuUsage}%</p>
      </div>
      <div className="tile tile-memory">
        <h5>Memory Usage</h5>
        <p>{memoryUsage} MB</p>
      </div>
      <div className="tile tile-network">
        <h5>Network Usage</h5>
        <p>{networkUsage}</p>
      </div>
      <div className="tile tile-uptime">
        <h5>System Uptime</h5>
        <p>{systemUptime}</p>
      </div>
      <div className="tile tile-battery">
        <h5>Battery Level </h5>
        <p>{batteryLevel.toString().substring(0, 4)}%</p>
      </div>
      <div className="tile tile-battery-status">
        <h5>Charging Status</h5>
        <p>{chargingStatus}</p>
      </div> */}
      {/* Add more tiles for other metrics */}
    </div>
  );
};

export default PerformanceMetrics
