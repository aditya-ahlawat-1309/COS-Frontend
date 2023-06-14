// import React, { useContext } from "react";
// import { Link } from "react-router-dom";


// export default function Welcome() {
// //  const [credentails, setCredentials] = useContext(CredentialsContext);
// //   const logout = () => {
// //     setCredentials(null);
// //   };

//   return (
//     <div>
//       <br />
//       <br />
//       {/* {credentails && <button onClick={logout}>Logout</button>} */}
//       <h1
//         style={{
//           fontSize: "3rem",
//           padding: "5%",
//           width: "50%",
//           marginLeft: "20%",
//           height:"100px"
//         }}
//       >
//         Welcome{/* {credentails && credentails.username} */}
//       </h1>
//       <br/>
//       <br/>
//       {/* {!credentails && ( */}
//       <Link
//         to="/register"
//         style={{
//           textDecoration: "none",
//           color: "white",
//           fontSize: "2rem",
//           fontWeight: "500",
//           backgroundColor: "green",
//           opacity: "1",
//           padding: "2%",
//           paddingLeft: "5%",
//           paddingRight: "5%",
//         }}
//       >
//         Register
//       </Link>
//       {/* )} */}
//       <br />
//       <br />
//       <br />
//       <br/>
//       <br />
//       {/* {!credentails && ( */}
//       <Link
//         to="/login"
//         style={{
//           textDecoration: "none",
//           color: "white",
//           fontSize: "2rem",
//           fontWeight: "500",
//           backgroundColor: "red",
//           opacity: "1",
//           padding: "2%",
//           paddingLeft: "5%",
//           paddingRight: "5%",
//         }}
//       >
//         Login
//       </Link>
//       {/* )} */}
//       {/* {credentails && <HomePage />} */}
//     </div>
//   );
// }

import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ChatContext } from "../Context/ChatProvider";

export default function Welcome() {
  const { user } = useContext(ChatContext);
  const history = useHistory();

  useEffect(() => {
    if (user && user.token) {
      history.push("/home");
    }
  });

  return (
    <div>
      <br />
      <br />
      <h1
        style={{
          fontSize: "3rem",
          padding: "5%",
          width: "50%",
          marginLeft: "20%",
          height: "100px",
        }}
      >
        Welcome
      </h1>
      <br />
      <br />
      <Link
        to="/register"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "2rem",
          fontWeight: "500",
          backgroundColor: "green",
          opacity: "1",
          padding: "2%",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        Register
      </Link>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link
        to="/login"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "2rem",
          fontWeight: "500",
          backgroundColor: "red",
          opacity: "1",
          padding: "2%",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        Login
      </Link>
    </div>
  );
}

