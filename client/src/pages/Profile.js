import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileSidebar from '../components/ProfileSidebar';

class Profile extends Component {
  render() {
    return <ProfileSidebar userInfo={this.props.userInfo} />;
  }
}

export default Profile;
