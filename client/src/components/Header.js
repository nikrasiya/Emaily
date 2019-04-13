import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <Fragment>
            <li>
              <Payments />
            </li>
            <li style={{margin: '0 5px 0 20px'}}>
              Credits: {this.props.auth.credits}
            </li>
            <li>
              <a href={"/api/logout"}>Logout</a>
            </li>
          </Fragment>
        );
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper" style={{ marginLeft: 15 }}>
            <Link
              className="left brand-logo"
              to={this.props.auth ? "/surveys" : "/"}
            >
              Emaily
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
