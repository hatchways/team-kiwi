import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";

class Profile extends Component {
  render() {
    return (
      <Router>
        <ProfileSidebar />
      </Router>
    );
  }
}

export default Profile;
