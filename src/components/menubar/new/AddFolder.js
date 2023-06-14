import React, {useState, useContext} from 'react'
import { ChatContext } from "../../../Context/ChatProvider";
import axios from 'axios'
import "./AddFolder.css"
const AddFolder = () => {

 const [folders, setFolders] = useState([]);
 const [inputValue, setInputValue] = useState("");

  const { user } = useContext(ChatContext);

     const handleInputChange = (event) => {
       setInputValue(event.target.value);
     };

    const handleAddFolder = () => {
      try {
        const config = {
          name: inputValue,
          Authorization: `Bearer ${user.token}:${user.username}`,
        };
        axios.post("http://localhost:8000/api/folders", config);
        setInputValue(""); // Clear the input field after adding the folder
        window.location.reload(); // Reload the window
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="addFolderDialogMain">
      <>
      <br/>
        <textarea
          type="text"
          style={{width:"90%",height:"20vh" }}
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Please write the name of the File'
        />
        <br/>
        <button
          onClick={handleAddFolder}
          style={{border:"1px solid green",background:"transparent",color:"green",borderRadius:"15px"}}
        >
          Add File
        </button>
      </>
    </div>
  );
}

export default AddFolder