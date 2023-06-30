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

