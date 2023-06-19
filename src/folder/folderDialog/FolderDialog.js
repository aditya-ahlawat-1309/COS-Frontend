
// // const FolderDialog = ({ handleCloseDialog }) => {




// //   const [text, setText] = useState("");

// //   const handleChange = (e) => {
// //     setText(e.target.value);
// //   };

// //    const { user } = ChatState();
// // console.log(user);
// //   const handleAddText = async () => {

// //       try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${user.token}:${user.username}`,
// //         },
// //       };
// //       await axios.post(
// //         `http://localhost:8000/api/history`,
// //         {
// //           body: text,
// //         },
// //         config
// //       );
// //     }
// //    catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   const getData = async () => {
// //     console.log("getData is being called");
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${user.token}:${user.username}`,
// //         },
// //       };

// //       const { data } = await axios.get(
// //         `http://localhost:8000/api/history`,
// //         config
// //       );
// //       console.log(data);
// //       setText(data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div className="folderDialogMain">
// //       <button className="closeButton" onClick={handleCloseDialog}>
// //         X
// //       </button>
// //       <textarea style={{width:"95%",height:"45vh",borderRadius:"15px"}} type="text" value={text} onChange={handleChange} />
// //       <button onClick={handleAddText}>Add Text</button>
// //     </div>
// //   );
// // };

// // export default FolderDialog


// import React, { useState, useEffect, useContext } from "react";
// import "./FolderDialog.css";
// import { ChatContext } from "../../Context/ChatProvider";
// import axios from "axios";

// const FolderDialog = ({ handleCloseDialog }) => {
//   const [text, setText] = useState("");
//   const { user } = useContext(ChatContext);

//   const handleChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleAddText = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}:${user.username}`,
//         },
//       };
//       console.log(text)
//       await axios.post(
//         `http://localhost:8000/api/history`,
        // {
        //   body: '123',
        // },
//         config
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getData = async () => {
//     console.log("getData is being called");
//     try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}:${user.username}`,
      //   },
      // };

//       const { data } = await axios.get(
//         `http://localhost:8000/api/history`,
//         config
//       );
//       console.log(data);
//       setText(data.text);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//  useEffect(() => {
//    getData();
//  }, []);

//   return (
    // <div className="folderDialogMain">
    //   <button className="closeButton" onClick={handleCloseDialog}>
    //     X
    //   </button>
    //   <textarea
    //     style={{ width: "95%", height: "45vh", borderRadius: "15px" }}
    //     type="text"
    //     value={text}
    //     onChange={handleChange}
    //   />
    //   <button onClick={handleAddText}>Add Text</button>
    // </div>
//   );
// };

// export default FolderDialog;

import React, { useState, useEffect, useContext } from "react";
import "./FolderDialog.css";
import { ChatContext } from "../../Context/ChatProvider";
import axios from "axios";
import DOMAIN from "../../Domian";

function FolderDialog({ handleCloseDialog, folderId, name }) {
  const { user } = useContext(ChatContext);
  const [texts, setTexts] = useState([]);
  const [newText, setNewText] = useState("");

  console.log(folderId);
  useEffect(() => {
    getTexts();
  }, [user]);

  const getTexts = async () => {
    try {
      const config = {
        id: folderId,
      };
      console.log(config);
      //       const config = {
      //         id:folderId,
      //           Authorization: `Bearer ${user.token}:${user.username}`,
      //       };
      // console.log(config)
      const response = await axios.post(`${DOMAIN}/api/get/files/text`, config);
      setTexts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddText = async () => {
    try {
      const config = {
        parentFolderId: folderId,
        text: newText,
      };

      const response = await axios.post(`${DOMAIN}/api/post/texts`, config);
      setNewText("");
      setTexts([...texts, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="folderDialogMain">
      <h2 style={{ color: "white" }}> {name}.txt</h2>
      <ul style={{ color: "white" }}>
        {texts.map((text) => (
          <li key={text._id}>{text.text}</li>
        ))}
      </ul>
      <textarea
        type="text"
        style={{ width: "100%", height: "25vh", fontSize:"large", border:"none" }}
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        placeholder="Enter text here ..."
      />

      <br />
      <button className="addTextButton" onClick={handleAddText}>
        Add Text
      </button>
      <button className="subFunctionsButton" onClick={handleCloseDialog}>
        BACK
      </button>

      {/* <textarea
        style={{ width: "95%", height: "45vh", borderRadius: "15px" }}
        type="text"
        value={text}
        onChange={handleChange}
      /> */}
    </div>
  );
}

export default FolderDialog;