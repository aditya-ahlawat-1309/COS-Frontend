// import React, { useState } from "react";
// import Desktop from "./desktop/Desktop";
// import Welcome from "./pages/Welcome";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import "./App.css";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// export const CredentialsContext = React.createContext();

// function App() {

//   return (
//     <>
//       <Router>
//         <Route path="/home" component={Desktop} />
//         <Route path="/" component={Welcome} exact />
//         <Route path="/login" component={Login} />
//         <Route path="/register" component={Register} />
//       </Router>
//     </>
//   );
// }

// export default App;

// App.js
// App.js
import React from "react";
import Desktop from "./desktop/Desktop";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <ChatProvider>
      <Router>
        <Switch>
          <Route path="/home" component={Desktop} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Welcome} exact />
        </Switch>
      </Router>
    </ChatProvider>
  );
}

export default App;

