import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';
class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Card>
        <Card.Header>{currentUser.user.username}</Card.Header>
        <Card.Body>
          <Card.Text>Token: {currentUser.access}</Card.Text>
          <Card.Text>Id: {currentUser.user.id}</Card.Text>
          <Card.Text>Email: {currentUser.user.email}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);