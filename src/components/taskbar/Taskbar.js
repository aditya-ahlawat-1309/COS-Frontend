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
import DOMAIN from "../../Domian";
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
        `${DOMAIN}/api/central-icons`
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
         `${DOMAIN}/api/isAdmin`,config
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
        `${DOMAIN}/api/central-icons`
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
      const response = await axios.post(`${DOMAIN}/api/getIcons`,config);
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
      await axios.post(`${DOMAIN}/api/icons`, config);
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
      axios.post(`${DOMAIN}/api/create`, config);
      setTimeout(() => {
      fetchCentralIconsForQueries()
      fetchCentralIcons()
      },1000)
    } catch (error) {
      console.error("Error adding icons:", error);
    }
  };

   const [showChildApp, setShowChildApp] = useState(false);

   const handleClick = () => {
    console.log("1");
     setShowChildApp(!showChildApp);
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
                <>
                  <ParentApp icon={icon} fetchAddedIcons={fetchAddedIcons} />
                  {/* <div key={icon._id}>
                  <a href={icon.link} target="_blank">
                    <img
                      className="taskBarLogo"
                      src={icon.image}
                      alt="Icon"
                      // width="50px"
                      // height="50px"
                    />
                  </a>
                </div> */}
                </>
              ))}
            </div>
          </div>
        </>

        {dialogOpen && (
          <div className="centralRepoDialogMain">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {centralIcons?.map((icon) => (
                <div className="displayIconsToAdd">
                  <div key={icon._id}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <img
                          src={icon.image}
                          alt="Icon"
                          className="taskBarLogo"
                        />
                      </div>
                      <div>
                      <br/>
                        <div style={{ display: "flex" }}>
                          {/* <label>Select to Add</label> */}
                          <span>{icon.iconname}</span>
                          <input
                            className="checkBoxInput"
                            type="checkbox"
                            checked={selectedIcons.includes(icon._id)}
                            onChange={() => handleIconSelect(icon)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="addTextButton" onClick={handleAddIcons}>
              Add Selected Icons
            </button>
            <button className="subFunctionsButton" onClick={handleCloseDialog}>
              CLOSE
            </button>
          </div>
        )}

        {isAdminDialogOpen && (
          <div className="centralRepoDialogMain">
            <div style={{ display: "flex" }}>
              <div className="adminCentralRepoPage">
                <div className="adminCentralRepoFunctions">
                  <br />
                  <input
                    className="createInputIcons"
                    placeholder="Enter Name of the App..."
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <br />
                  <br />
                  <input
                    className="createInputIcons"
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter Image Link of the App..."
                  ></input>
                  <br />
                  <br />
                  <input
                    className="createInputIcons"
                    onChange={(e) => setHref(e.target.value)}
                    placeholder="Enter Href Link of the App..."
                  ></input>
                  <br />
                  <br />
                  <button onClick={handleAddApps} className="addAppsButton">
                    Add Apps
                  </button>
                </div>
              </div>
              <div className="adminCentralRepoMapping">
                <h2>Central Icons</h2>
                {icons?.map((icon, index) => (
                  <>
                    <UpdateCentralIcons
                      icon={icon}
                      fetchCentralIconsForQueries={fetchCentralIconsForQueries}
                      fetchCentralIcons={fetchCentralIcons}
                    />

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
            <button onClick={handleAdminClick} className="subFunctionsButton">
              CLOSE
            </button>
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
        `${DOMAIN}/api/update/${id}`,
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
        `${DOMAIN}/api/delete/${id}`
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
        <h4>App - {icon.iconname}</h4>
        <input
          className="createInputIcons"
          type="text"
          placeholder="Updated Name"
          name="iconname"
          value={updatedIcon.iconname}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input
          className="createInputIcons"
          type="text"
          placeholder="Updated Link"
          name="link"
          value={updatedIcon.link}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input
          className="createInputIcons"
          type="text"
          placeholder="Updated Image"
          name="image"
          value={updatedIcon.image}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <div style={{display:"flex"}}>
          <button
            className="updateAppsButton"
            onClick={() => handleUpdateIcon(icon._id)}
          >
            Update
          </button>
        &nbsp;&nbsp;
          <button
            className="deleteAppsButton"
            onClick={() => handleDeleteIcon(icon._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


const ParentApp = ({icon, fetchAddedIcons}) => {
  const [showChildApp, setShowChildApp] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);

  const handleClick = () => {
    setShowChildApp(true);
  };

  const handleMouseDown = (event) => {
    event.preventDefault();

    if (event.button === 2) {
     setRemoveDialog(!removeDialog)
    }
  };

   const handleDeleteIcon = async () => {
     try {
       const response = await axios.post(
         `${DOMAIN}/api/delete/icon/${icon._id}`
       );
       console.log("Icon deleted:", response.data);
       fetchAddedIcons()
       // You can perform additional actions after deleting the icon
     } catch (error) {
       console.error("Error:", error);
     }
   };

  const handleCloseApp = () => {
    setShowChildApp(false);
  };


  return (
    <div>
      <button onClick={handleClick} className="logoButton">
        <div key={icon._id}>
          <img
            onContextMenu={handleMouseDown}
            className="taskBarLogo"
            src={icon.image}
            alt="Icon"
          />
        </div>
      </button>

      {showChildApp && (
        <button
          className="removeAppsFromTaskBarButton"
          onClick={handleCloseApp}
        >
          CLOSE
        </button>
      )}
      {removeDialog && (
        <button
          className="removeAppsFromTaskBarButton"
          onClick={handleDeleteIcon}
        >
          REMOVE
        </button>
      )}

      {showChildApp && (
        <div className="iFrameDialogMain">
          <iframe
            id="refIframe"
            title="iFrame"
            src={icon.link} // Replace with the URL of the child application
            height="99%"
            width="505%"
          />
        </div>
      )}
    </div>
  );
};



export default Taskbar;
