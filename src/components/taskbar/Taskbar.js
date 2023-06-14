// import React,{useState} from 'react'
// import terminal from "../../media/terminal.svg"
// import camera from "../../media/camera.png"
// import drum from "../../media/drum.png"
// import notes from "../../media/notes.png"
// import twitter from "../../media/twitter.png"
// import whatsapp from "../../media/whatsapp.png"
// import paint from "../../media/paint.png"
// import nasa from "../../media/nasa.png"
// import java from "../../media/java.png"
// import "./Taskbar.css"
// import Terminal from '../../terminal/Terminal'
// const Taskbar = () => {

  // const [isTerminalDialogOpen, setIsTerminalDialogOpen] = useState(false);

  // const handleTerminalClick = () => {
  //   setIsTerminalDialogOpen(!isTerminalDialogOpen);
  //   if(isTerminalDialogOpen===true)
  //   {window.location.reload();}
  // };

//   return (
//     <>
//       <div className="taskbarMain">
//         <button className="logoButton" onClick={handleTerminalClick}>
//           <img src={terminal} className="taskBarLogo"></img>
//         </button>
        
//         <a
//           className="logoLink"
//           href="https://dicegamedice.netlify.app"
//           target="_blank"
//         >
//           <img src={drum} className="taskBarLogo"></img>
//         </a>
//         <a className="logoLink">
//           <img src={camera} className="taskBarLogo"></img>
//         </a>
//         <a
//           className="logoLink"
//           href="https://todo-aditya.netlify.app"
//           target="_blank"
//         >
//           <img src={notes} className="taskBarLogo"></img>
//         </a>

//         <a
//           className="logoLink"
//           href="https://paint0183.netlify.app/"
//           target="_blank"
//         >
//           <img src={paint} className="taskBarLogo"></img>
//         </a>
//         <a
//           className="logoLink"
//           href="https://ztmnasa.netlify.app/"
//           target="_blank"
//         >
//           <img src={nasa} className="taskBarLogo"></img>
//         </a>
//         <button
//           className="logoButton"
//           href="https://github.com/aditya-ahlawat-1309/Notepad"
//           target="_blank"
//         >
//           <img src={java} className="taskBarLogo"></img>
//         </button>
//         <a
//           className="logoLink"
//           href="https://twitter1309.netlify.app/"
//           target="_blank"
//         >
//           <img src={twitter} className="taskBarLogo"></img>
//         </a>
//         <a
//           className="logoLink"
//           href="https://chatfullstack.netlify.app"
//           target="_blank"
//         >
//           <img src={whatsapp} className="taskBarLogo"></img>
//         </a>
//       </div>
      // {isTerminalDialogOpen && (
      //   <Terminal handleCloseDialog={handleTerminalClick} />
      // )}
//     </>
//   );
// }

// export default Taskbar


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Taskbar.css";
import terminal from "../../media/terminal.svg";
import admin from "../../media/admin.png";
import app from "../../media/app.png"
import Terminal from "../../terminal/Terminal";
import { getFolders } from "../../folder/Folder";
const Taskbar = () => {
  const [centralIcons, setCentralIcons] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [addedIcons, setAddedIcons] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const [name, setName] = useState([]);
  const [link, setLink] = useState([]);
  const [href, setHref] = useState([]);

  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
    const [isTerminalDialogOpen, setIsTerminalDialogOpen] = useState(false);

   

    
    const handleAdminClick = () => {
      setIsAdminDialogOpen(!isAdminDialogOpen);
    };

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [icons, setIcons] = useState([]);
const [updatedIcons, setUpdatedIcons] = useState([]);
  const [deletedIconId, setDeletedIconId] = useState("");

  useEffect(() => {
    fetchCentralIconsForQueries();
  }, []);

  const fetchCentralIconsForQueries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/central-icons"
      );
      setIcons(response.data);
    } catch (error) {
      console.error("Error fetching central icons:", error);
    }
  };
  
  const [folders,setFolders] = useState([])

     const handleTerminalClick = () => {
       setIsTerminalDialogOpen(!isTerminalDialogOpen);
      //  if (isTerminalDialogOpen === true) {
         // window.location.reload();
         getFolders(userInfo, setFolders);
      //  }
     };




  useEffect(() => {
    fetchCentralIcons();
    fetchAddedIcons();
    fetchUserDetails();
  }, []);

   const fetchUserDetails = async () => {
     const config = {
       headers: {
         Authorization: `Bearer ${userInfo.token}:${userInfo.username}`,
       },
     };
     try {
       const response = await axios.post(
         "http://localhost:8000/api/isAdmin",config
       );
       console.log(response.data);
       setUserDetails(response.data.isAdmin);
     } catch (error) {
       console.error("Error fetching central icons:", error);
     }
   };

  const fetchCentralIcons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/central-icons"
      );
      setCentralIcons(response.data);
    } catch (error) {
      console.error("Error fetching central icons:", error);
    }
  };

  const fetchAddedIcons = async () => {
     const config = {
       headers: {
         Authorization: `Bearer ${userInfo.token}:${userInfo.username}`,
       },
     };
    try {
      const response = await axios.post("http://localhost:8000/api/getIcons",config);
      setAddedIcons(response.data);
    } catch (error) {
      console.error("Error fetching added icons:", error);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleIconSelect = (icon) => {
    const isSelected = selectedIcons.includes(icon._id);
    if (isSelected) {
      setSelectedIcons(selectedIcons.filter((id) => id !== icon._id));
    } else {
      setSelectedIcons([...selectedIcons, icon._id]);
    }
  };

  const handleAddIcons = async () => {
     const config = {
       headers: {
         Authorization: `Bearer ${userInfo.token}:${userInfo.username}`,
         selectedIcons: selectedIcons
       },
     };
    try {
      await axios.post("http://localhost:8000/api/icons", config);
      setSelectedIcons([]);
      handleCloseDialog();
      fetchAddedIcons();
    } catch (error) {
      console.error("Error adding icons:", error);
    }
  };


  const handleAddApps = () => {
    const config = {
      headers: {
       iconname: name,
       link: href,
       image: link,
      },
    };
    try {
      axios.post("http://localhost:8000/api/create", config);
      setTimeout(() => {
      fetchCentralIconsForQueries()
      fetchCentralIcons()
      },1000)
    } catch (error) {
      console.error("Error adding icons:", error);
    }
  };



  return (
    <>
      <div>
        <>
          <div className="taskbarMain">
            <div className="logoLink" style={{ display: "flex" }}>
              {userDetails && (
                <>
                  <button className="logoButton" onClick={handleAdminClick}>
                    <img src={admin} className="taskBarLogo"></img>
                  </button>
                </>
              )}
              <button className="logoButton" onClick={handleTerminalClick}>
                <img src={terminal} className="taskBarLogo"></img>
              </button>
              <button className="logoButton" onClick={handleOpenDialog}>
                <img src={app} className="taskBarLogo"></img>
              </button>
              {addedIcons?.map((icon) => (
                <div key={icon._id}>
                  <a href={icon.link} target="_blank">
                    <img
                      className="taskBarLogo"
                      src={icon.image}
                      alt="Icon"
                      // width="50px"
                      // height="50px"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </>

        {dialogOpen && (
          <div className="centralRepoDialogMain">
            {centralIcons?.map((icon) => (
              <div key={icon._id}>
                <img src={icon.image} alt="Icon" className="taskBarLogo" />
                <div style={{ display: "flex" }}>
                  <h6>{icon.iconname}</h6>
                  <input
                    type="checkbox"
                    checked={selectedIcons.includes(icon._id)}
                    onChange={() => handleIconSelect(icon)}
                  />
                </div>
              </div>
            ))}
            <button onClick={handleAddIcons}>Add Selected Icons</button>
            <button onClick={handleCloseDialog}>Cancel</button>
          </div>
        )}

        {isAdminDialogOpen && (
          <div className="centralRepoDialogMain">
            <label>Name</label>
            <input onChange={(e) => setName(e.target.value)}></input>
            <label>Image Link</label>
            <input onChange={(e) => setLink(e.target.value)}></input>
            <label>Href</label>
            <input onChange={(e) => setHref(e.target.value)}></input>
            <button onClick={handleAddApps}>Add Apps</button>
            <button onClick={handleAdminClick}>Cancel</button>
            <div>
              <h2>Central Icons</h2>
              {icons.map((icon, index) => (
                <>
                <UpdateCentralIcons icon={icon} fetchCentralIconsForQueries={fetchCentralIconsForQueries} fetchCentralIcons={fetchCentralIcons}/>

                  {/* <div key={icon._id}>
                  <h4>{icon.iconname}</h4>
                  <input
                    type="text"
                    placeholder="Updated Name"
                    value={updatedIcons[index]?.iconname || icon.iconname}
                    onChange={(event) => handleChange(event, index, "iconname")}
                  />
                  <input
                    type="text"
                    placeholder="Updated Link"
                    value={updatedIcons[index]?.link || icon.link}
                    onChange={(event) => handleChange(event, index, "link")}
                  />
                  <input
                    type="text"
                    placeholder="Updated Image"
                    value={updatedIcons[index]?.image || icon.link}
                    onChange={(event) => handleChange(event, index, "image")}
                  />
                  <button
                    onClick={() =>
                      handleUpdateIcon(icon._id, updatedIcons[index])
                    }
                  >
                    Update
                  </button>
                  <button onClick={() => handleDeleteIcon(icon._id)}>
                    Delete
                  </button>
                </div> */}
                </>
              ))}
            </div>
          </div>
        )}
      </div>
      {isTerminalDialogOpen && (
        <Terminal handleCloseDialog={handleTerminalClick} />
      )}
    </>
  );
};

const UpdateCentralIcons = ({ icon, fetchCentralIconsForQueries, fetchCentralIcons }) => {
  const [updatedIcon, setUpdatedIcon] = useState({
    iconname: icon.iconname,
    link: icon.link,
    image: icon.image,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedIcon((prevIcon) => ({
      ...prevIcon,
      [name]: value,
    }));
  };

  const handleUpdateIcon = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/update/${id}`,
        updatedIcon
      );
      console.log('Icon updated:', response.data);
      fetchCentralIconsForQueries()
      fetchCentralIcons()
      // You can perform additional actions after updating the icon
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteIcon = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/delete/${id}`
      );
      console.log('Icon deleted:', response.data);
      fetchCentralIconsForQueries()
      fetchCentralIcons()
      // You can perform additional actions after deleting the icon
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div key={icon._id}>
        <h4>{icon.iconname}</h4>
        <input
          type="text"
          placeholder="Updated Name"
          name="iconname"
          value={updatedIcon.iconname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Updated Link"
          name="link"
          value={updatedIcon.link}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Updated Image"
          name="image"
          value={updatedIcon.image}
          onChange={handleInputChange}
        />
        <button onClick={() => handleUpdateIcon(icon._id)}>Update</button>
        <button onClick={() => handleDeleteIcon(icon._id)}>Delete</button>
      </div>
    </div>
  );
};


export default Taskbar;
