import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileSidebar from '../components/ProfileSidebar';

class Profile extends Component {
  render() {
    return (
      <>
        <Router>
          <ProfileSidebar userInfo={this.props.userInfo} />
        </Router>
      </>
    );
  }
}

export default Profile;
