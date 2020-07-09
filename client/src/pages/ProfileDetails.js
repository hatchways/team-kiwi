import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileDetailForm from '../components/ProfileDetailForm';

class ProfileDetails extends Component {
  render() {
    return (
      <Router>
        <ProfileDetailForm />
      </Router>
    );
  }
}

export default ProfileDetails;
