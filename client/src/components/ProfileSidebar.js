import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./ProfileSidebar.css";

import Edit from "../pages/profile/Edit";
import Photo from "../pages/profile/Photo";
import Availability from "../pages/profile/Availability";
import Payment from "../pages/profile/Payment";
import Security from "../pages/profile/Security";
import Settings from "../pages/profile/Settings";

export default function ProfileSidebar() {
  return (
    <div className="app">
      <div className="sidebar">
        <Link to="/profile-edit">Edit Profile</Link>
        <Link to="/profile-photo">Profile Photo</Link>
        <Link to="/profile-availability">Your availability</Link>
        <Link to="/profile-payment">Payment</Link>
        <Link to="/profile-security">Security</Link>
        <Link to="/profile-settings">Settings</Link>
      </div>
      <div className="content">
        <Switch>
          <Route path="/profile-edit">
            <Edit />
          </Route>
          <Route path="/profile-photo">
            <Photo />
          </Route>
          <Route path="/profile-availability">
            <Availability />
          </Route>
          <Route path="/profile-payment">
            <Payment />
          </Route>
          <Route path="/profile-security">
            <Security />
          </Route>
          <Route path="/profile-settings">
            <Settings />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
