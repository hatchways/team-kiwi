import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileDetailForm from '../components/ProfileDetailForm';
import axios from 'axios';

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
    };
    this.getProfile = this.getProfile.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.getProfile();
  }
  getProfile() {
    axios
      .get(`/userProfile/profile/${this.state.userInfo.id}`)
      .then((res) => {
        if (!res.data.error) {
          // If successfully added
          this.setState({
            userInfo: res.data,
          });
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  render() {
    return (
      <Router>
        <ProfileDetailForm userInfo={this.state.userInfo} />
      </Router>
    );
  }
}

export default ProfileDetails;
