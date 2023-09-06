import { withAuth0 } from "@auth0/auth0-react";
import React from "react";
import { render } from "react-dom";

class Profile extends React.Component {
  render() {
    const { isAuthenticated, loginWithRedirect, logout } = this.props.auth0;
    if (!isAuthenticated) {
      return <button onClick={loginWithRedirect}>Login</button>;
    } else {
      return (
        <button
          onClick={() => {
            logout({
              returnTo: window.location.origin,
            });
          }}
        >
          Log Out
        </button>
      );
    }
  }
}

export default withAuth0(Profile);
