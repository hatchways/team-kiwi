import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./Navbar.css";

import Home from "../pages/Home";
import MyJobs from "../pages/MyJobs";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";

export default function Navbar() {
  return (
    <div>
      <div className="menu">
        <Link to="/" className="menu-item">
          Home
        </Link>
        <Link to="/myjobs" className="menu-item">
          My Jobs
        </Link>
        <Link to="/message" className="menu-item">
          Messages
        </Link>
        <Link to="/profile" className="menu-item">
          Profile
        </Link>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/myjobs">
          <MyJobs />
        </Route>
        <Route path="/message">
          <Messages />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}
