import React, {useState, useContext} from 'react'
import { ChatContext } from "../../../Context/ChatProvider";
import axios from 'axios'
import "./AddFolder.css"
import DOMAIN from '../../../Domian';

import { fetchSubfiles } from '../../../folder/Folder';
import { fetchSubfolders } from '../../../folder/Folder';
const AddFolder = () => {

 const [folderName, setFolderName] = useState("");
 const [parentFolder, setParentFolder] = useState(null);
 const [folders, setFolders] = useState([]);

 const [fileName, setFileName] = useState("");
 const [files, setFiles] = useState([]);

 const handleFolderNameChange = (event) => {
   setFolderName(event.target.value);
 };

 const handleFileNameChange = (event) => {
   setFileName(event.target.value);
 };
 const user = JSON.parse(localStorage.getItem("userInfo"));

 const handleCreateFolder =  () => {
   try {
     const config = {
       headers: {
         Authorization: `Bearer ${user.token}:${user.username}`,
         name: folderName,
         parentFolderId: user._id,
       },
     };
     const response = axios.post(
       `${DOMAIN}/api/post/folders`,
       config
     );
     console.log("Parent folder created:", response.data);
     // Reset the folder name input
     setFolderName("");
      setTimeout(() => {
         fetchSubfolders(user, setFolders);
      }, 750);
    
   } catch (error) {
     console.error("Error:", error);
   }
 };

 const handleCreateFile =  () => {
   try {
     const config = {
       headers: {
         Authorization: `Bearer ${user.token}:${user.username}`,
         name: fileName,
         parentFolderId: user._id,
       },
     };
     const response = axios.post(
       `${DOMAIN}/api/post/files`,
       config
     );
     console.log("Parent folder created:", response.data);
     // Reset the folder name input
     setFileName("");
     setTimeout(() => {
fetchSubfiles(user, setFiles);
     }, 750);
     
   } catch (error) {
     console.error("Error:", error);
   }
 };

  return (
    <div className="createFunctions">
      <input
        type="text"
        placeholder=" Enter Folder Name"
        value={folderName}
        onChange={handleFolderNameChange}
        className="createInput"
      />
      &nbsp;&nbsp;&nbsp;
      <button className="createButton" onClick={handleCreateFolder}>
        NEW FOLDER
      </button>
      <br />
      <br />
      <input
        type="text"
        placeholder=" Enter File Name"
        value={fileName}
        onChange={handleFileNameChange}
        className="createInput"
      />
      &nbsp;&nbsp;&nbsp;
      <button className="createButton" onClick={handleCreateFile}>
        NEW FILE
      </button>
    </div>
  );
}

export default AddFolder