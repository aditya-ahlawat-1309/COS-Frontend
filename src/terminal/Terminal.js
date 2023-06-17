import React, {useState, useContext} from 'react'
import "./Terminal.css"
import axios from 'axios';
import { ChatContext } from "../Context/ChatProvider";


const Terminal = ({handleCloseDialog}) => {
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");

 const { user } = useContext(ChatContext);

  const handleInputChange = (event) => {
    setCurrentCommand(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      executeCommand();
    }
  };

  const executeCommand = () => {
    if (currentCommand.trim() === "") {
      return;
    }
    console.log("s");

console.log("Start");
   const handleAddFolder = async () => {
     try {
       const config = {
         command: currentCommand,
         Authorization: `Bearer ${user.token}:${user.username}`,
       };
       console.log("send");
       const response = await axios.post(
         "http://localhost:8000/api/command",
         config
       );
       const newFolder = response.data;
   
} catch (error) {
       console.log(error);
     }
   };
     handleAddFolder(); 
 const updatedCommandHistory = [...commandHistory, currentCommand];
 setCommandHistory(updatedCommandHistory);
 setCurrentCommand("");
 

  };

  return (
    <div className="terminal-main">
      <div className="terminal-container">
        <button className="subFunctionsButton" onClick={handleCloseDialog}>
          CLOSE
        </button>
        {commandHistory.map((command, index) => (
          <div key={index} className="terminal-output">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">{command}</span>
          </div>
        ))}
        <div className="terminal-output">
          <div style={{ display: "flex" }}>
            <span className="terminal-prompt">$ </span>
            <input
              type="text"
              className="terminal-input"
              value={currentCommand}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terminal