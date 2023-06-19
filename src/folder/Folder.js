import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Folder.css"
import "./folderDialog/FolderDialog.css"
// import React, { useState, useEffect, useContext } from "react";
import folderLogo from "../media/folder.png"
import notepad from "../media/notepad.png"
// import "./Folder.css";
import FolderDialog from "./folderDialog/FolderDialog";
import DOMAIN from "../Domian";
// import EditDialog from "../components/menubar/edit/EditDialog";
// import axios from 'axios'
// import { ChatContext } from "../Context/ChatProvider";

// // const DraggableBox = ({ id, name, initialPosition }) => {
// //   const [position, setPosition] = useState(initialPosition);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

// //   const handleMouseDown = (event) => {

// //      event.preventDefault(); // Prevent default context menu behavior

// //      if (event.button === 2) {
// //        // Right mouse button clicked
// //        setIsDragging(true);
// //       //  const offsetX = event.clientX - position.x;
// //       //  const offsetY = event.clientY - position.y;
// //       const offsetX = event.clientX;
// //       const offsetY = event.clientY;
// //        setDragOffset({ x: offsetX, y: offsetY });
// //      }
// //   };

// //   const handleMouseMove = (event) => {
// //     if (!isDragging) return;
// //     setPosition({
// //       x: event.clientX - dragOffset.x,
// //       y: event.clientY - dragOffset.y,
// //     });
// //   };

// //   const handleMouseUp = () => {
// //     setIsDragging(false);
// //   };

// //   // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

// //   // const handleEditClick = () => {
// //   //   setIsEditDialogOpen(!isEditDialogOpen);
// //   // };
// // const [isOpen, setIsOpen] = useState(false);
// //    const handleOpenDialog = () => {
// //      setIsOpen(!isOpen);
// //    };

// //   return (
// //     <>
// //       <button
// //         className="folderLogoButton"
// //         style={{
// //           position: "relative",
// //           // left: position.x,
// //           // top: position.y,
// //           cursor: "move",
// //         }}
// //         // onMouseDown={handleMouseDown}
// //         onContextMenu={handleMouseDown}
// //         onMouseMove={handleMouseMove}
// //         onMouseUp={handleMouseUp}
// //         onClick={handleOpenDialog}
// //       >
// //         <img src={folder} width="50%" />
// //         <br />
// //         <label className="folderLabel"> Folder {name}</label>
// //       </button>
// //       {isOpen && (
// //         <FolderDialog handleCloseDialog={handleOpenDialog} folderId={id} />
// //       )}
// //     </>
// //   );
// // };

const DraggableBox = ({ id, name }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    event.preventDefault();

    if (event.button === 2) {
      setIsDragging(true);
      const offsetX = event.clientX;
      const offsetY = event.clientY;
      setDragOffset({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    setPosition({
      x: event.clientX - dragOffset.x,
      y: event.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const [isOpen, setIsOpen] = useState(false);
 
  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

const handleDeleteIcon = async () => {
   try {
        const response = await axios
          .post(`${DOMAIN}/api/post/delete/${id}`)
          .then(() => {
            window.location.reload();
          });
          
        // You can perform additional actions after deleting the icon
      } catch (error) {
        console.error("Error:", error);
      }
}

        const [removeDialog, setRemoveDialog] = useState(false);

          const handleFileClick = () => {
            //
            setRemoveDialog(!removeDialog);
          };

  return (
    <>
      <button
        className="folderLogoButton"
        style={{
          position: "relative",
          cursor: "move",
          left: position.x,
          top: position.y,
        }}
        onContextMenu={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleFileClick}
      >
        <img src={notepad} width="40%" alt="Folder" />
        <br />
        <label className="folderLabel">File {name}.txt</label>
      </button>

      {removeDialog && (
        <div className="folderOpenAndDeleteButtons">
          <button className="openButtonClick" onClick={handleOpenClick}>
            OPEN
          </button>
          <button className="deleteButtonClick" onClick={handleDeleteIcon}>
            DELETE
          </button>
        </div>
      )}

      {isOpen && (
        <FolderDialog
          handleCloseDialog={handleOpenClick}
          folderId={id}
          name={name}
        />
      )}
    </>
  );
};

const getFolders = async (user, setFolders) => {
  try {
    const config = {
      headers: {
        id: user._id,
      },
    };
    console.log(config);
    const response = await axios.post(
      `${DOMAIN}/api/get/parentFolders`,
      config
    );
    setFolders(response.data);
  } catch (error) {
    console.log(error);
  }
};

// const Folder = () => {
//   const [folders, setFolders] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [inputValue, setInputValue] = useState("");

//    const user = JSON.parse(localStorage.getItem("userInfo"));
  // useEffect(() => {
  //   getFolders(user, setFolders);
  // }, []);

//   //  useEffect(() => {
//   //    // Call getFolders again whenever folders state is updated
//   //    getFolders(user, setFolders);
//   //  }, [folders]);

//   const handleOpenDialog = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleAddFolder = async () => {
//     try {
//         const config = {
//           name:inputValue,
//           Authorization: `Bearer ${user.token}:${user.username}`,
//         };
//       const response = await axios.post("http://localhost:8000/api/folders", config);
//       const newFolder = response.data;
//       setFolders([...folders, newFolder]);
//       setInputValue(""); // Clear the input field after adding the folder
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
      // <div>
      //   {folders.map((folder) => (
      //     <DraggableBox
      //       key={folder._id}
      //       id={folder._id}
      //       name={folder.name}
      //       initialPosition={folder.position}
      //     />
      //   ))}
      // </div>

//       {/* <input type="text" value={inputValue} onChange={handleInputChange} />
//       <button onClick={handleAddFolder}>Add Folder</button> */}

//       {isOpen && <FolderDialog handleCloseDialog={handleOpenDialog} />}
//     </>
//   );
// };

// export default Folder;
export { getFolders };

// // const Folder = () => {
// //  const initialPositions = [
// //    { id: 1, x: 50, y: 50 },
// //    { id: 2, x: 150, y: 150 },
// //  ];

// //   const [isOpen, setIsOpen] = useState(false);
// //   const handleOpenDialog = () => {
// //     setIsOpen(!isOpen);
// //   };

// //  return (
// //    <>
// //      <div>
// //        {initialPositions.map((pos) => (
// //          <DraggableBox key={pos.id} id={pos.id} initialPosition={pos} />
// //        ))}
// //      </div>

// //    </>
// //  );
// // };

// // export default Folder;

// // const Folder = () => {
// //   const [folders, setFolders] = useState([]);
// //   const [isOpen, setIsOpen] = useState(false);
// // const { user } = useContext(ChatContext);
// // console.log(user);
//   // useEffect(() => {
//   //   getFolders();
//   // }, [user]);

// //   const getFolders = async () => {
// //     try {
// // console.log(user)
// //             const config = {
// //               headers: {
// //                 Authorization: `Bearer ${user.token}:${user.username}`,
// //               },
// //             };
// //       const response = await axios.get("http://localhost:8000/api/folders",config);
// //       console.log(response.data)
// //       setFolders(response.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleOpenDialog = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   const handleAddFolder = async () => {
// //     try {
// //       console.log(user);
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${user.token}:${user.username}`,
// //         },
// //       };
// //       const response = await axios.post(
// //         "http://localhost:8000/api/folders",
// //         {
// //           body: {

// //             name:"new Folder"
// //           },
// //         },
// //         config
// //       );
// //       const newFolder = response.data;
// //       setFolders([...folders, newFolder]);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <>
// //       <div>
// //         {folders.map((folder) => (
// //           <DraggableBox
// //           style={{margin:"100px"}}
// //             key={folder._id}
// //             id={folder._id}
// //             initialPosition={folder.position}
// //           />
// //         ))}
// //       </div>

// //       <button onClick={handleAddFolder}>Add Folder</button>

// //       {isOpen && <FolderDialog handleCloseDialog={handleOpenDialog} />}
// //     </>
// //   );
// // };

// // export default Folder;

const Folder = ({ folder }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [subfolders, setSubfolders] = useState([]);
const [isOpen, setIsOpen] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [parentFolder, setParentFolder] = useState(null);
  const [folders, setFolders] = useState([]);

     const [fileName, setFileName] = useState("");
     const [files, setFiles] = useState([]);

      const [removeDialog, setRemoveDialog] = useState(false);

    const handleFolderNameChange = (event) => {
      setFolderName(event.target.value);
    };

    
    const handleFileNameChange = (event) => {
      setFileName(event.target.value);
    };
  const handleFolderClick = () => {
    // 
     setRemoveDialog(!removeDialog);
  };

  const handleOpenClick = () => {
      setDialogOpen(true);
  }



  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

    const handleOpenDialog = () => {
      setIsOpen(!isOpen);
    };

        const user = JSON.parse(localStorage.getItem("userInfo"));


    const handleCreateFolder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}:${user.username}`,
            name: folderName,
            parentFolderId: folder._id,
          },
        };
        const response = await axios.post(`${DOMAIN}/api/post/folders`, config);
        console.log("Parent folder created:", response.data);
        // Reset the folder name input
        setFolderName("");

        fetchSubfolders();
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchSubfolders = async () => {
      try {
        const config = {
          headers: {
            id: folder._id,
          },
        };
        const response = await axios.post(
          `${DOMAIN}/api/get/subFolders`,
          config
        );
        console.log(response.data);
        setSubfolders(response.data.subfolders);
      } catch (error) {
        console.error("Error:", error);
      }
    };

  useEffect(() => {
    const fetchSubfolders = async () => {
      try {
        const config = {
          headers: {
            id: folder._id,
          },
        };
        const response = await axios.post(
          `${DOMAIN}/api/get/subFolders`,
          config
        );
        setSubfolders(response.data.subfolders);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (dialogOpen) {
      fetchSubfolders();
    }
  }, [dialogOpen, folder._id]);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event) => {
      event.preventDefault();

      if (event.button === 2) {
        setIsDragging(true);
        const offsetX = event.clientX;
        const offsetY = event.clientY;
        setDragOffset({ x: offsetX, y: offsetY });
      }
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      setPosition({
        x: event.clientX - dragOffset.x,
        y: event.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };


    const handleCreateFile = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}:${user.username}`,
            name: fileName,
            parentFolderId: folder._id,
          },
        };
        const response = await axios.post(`${DOMAIN}/api/post/files`, config);
        console.log("Parent folder created:", response.data);
        // Reset the folder name input
        setFileName("");

        fetchSubfiles();
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchSubfiles = async () => {
      try {
        const config = {
          headers: {
            id: folder._id,
          },
        };
        const response = await axios.post(
          `${DOMAIN}/api/get/subFolders`,
          config
        );
        console.log(response.data);
        setFiles(response.data.files);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    console.log(user);
    useEffect(() => {
      const fetchSubfiles = async () => {
        try {
          const config = {
            headers: {
              id: folder._id,
            },
          };
          const response = await axios.post(
            `${DOMAIN}/api/get/subFolders`,
            config
          );
          console.log(response.data);
          setFiles(response.data.files);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchSubfiles();
    }, []);



    const handleDeleteIcon = async () => {
      try {
        const response = await axios
          .post(`${DOMAIN}/api/post/delete/${folder._id}`)
          .then(() => {
            window.location.reload();
          });
          
        // You can perform additional actions after deleting the icon
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <>
      <div>
        <button
          className="folderLogoButton"
          style={{
            position: "relative",
            cursor: "move",
            left: position.x,
            top: position.y,
          }}
          onContextMenu={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleOpenDialog}
        >
          <div onClick={handleFolderClick}>
            <img src={folderLogo} width="40%" alt="Folder" />
            <br />
            {/* <label className="folderLabel">File {name}.txt</label> */}
            <span>{folder.name}</span>
          </div>
        </button>

        {removeDialog && (
          <div className="folderOpenAndDeleteButtons">
            <button className="openButtonClick" onClick={handleOpenClick}>
              OPEN
            </button>
            <button className="deleteButtonClick" onClick={handleDeleteIcon}>
              DELETE
            </button>
          </div>
        )}

        {dialogOpen && (
          <div className="folderDialogMain">
            <br />
            <br />
            <div className="createSubFunctions">
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
            <br />
            {subfolders.map((subfolder) => (
              <Folder key={subfolder._id} folder={subfolder} />
            ))}
            <div style={{ display: "flex" }}>
              {files.map((file) => (
                <DraggableBox
                  key={file._id}
                  id={file._id}
                  name={file.name}
                  initialPosition={file.position}
                />
              ))}
            </div>
            <button className="subFunctionsButton" onClick={handleCloseDialog}>
              BACK
            </button>
          </div>
        )}
      </div>
    </>
  );
};


  const fetchSubfiles = async (user, setFiles) => {
    try {
      const config = {
        headers: {
          id: user._id,
        },
      };
      const response = await axios.post(`${DOMAIN}/api/get/subFolders`, config);
      console.log(response.data);
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSubfolders = async (user, setFolders) => {
    try {
      const config = {
        headers: {
          id: user._id,
        },
      };
      const response = await axios.post(`${DOMAIN}/api/get/subFolders`, config);
      console.log("called");
      setFolders(response.data.subfolders);
      window.location.reload()
    } catch (error) {
      console.error("Error:", error);
    }
  };

  export { fetchSubfolders };
  export { fetchSubfiles };

const CreateParentFolder = () => {
  const [folderName, setFolderName] = useState("");
  const [parentFolder, setParentFolder] = useState(null);
  const [folders, setFolders] = useState([]);
    const [fileName, setFileName] = useState("");
    const [files, setFiles] = useState([]);

    const fetchSubfiles = async (user, setFiles) => {
      try {
        const config = {
          headers: {
            id: user._id,
          },
        };
        const response = await axios.post(
          `${DOMAIN}/api/get/subFolders`,
          config
        );
        console.log(response.data);
        setFiles(response.data.files);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchSubfolders = async (user, setFolders) => {
      try {
        const config = {
          headers: {
            id: user._id,
          },
        };
        const response = await axios.post(
          `${DOMAIN}/api/get/subFolders`,
          config
        );
        console.log("called");
        setFolders(response.data.subfolders);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSubfiles()
    fetchSubfolders()
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    fetchSubfolders(user, setFolders);
     fetchSubfiles(user, setFiles);
  },[]);
  return (
    <div>
      <br />
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {folders.map((folder) => (
          <Folder key={folder._id} folder={folder} />
        ))}
      </div>

      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {files.map((folder) => (
          <DraggableBox
            key={folder._id}
            id={folder._id}
            name={folder.name}
            initialPosition={folder.position}
          />
        ))}
      </div>
    </div>
  );
};




export default CreateParentFolder;