import React, { Component } from "react";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>
          <span role={"img"} aria-label={"sparkles"}>
            ✨
          </span>{" "}
          Emaily{" "}
          <span role={"img"} aria-label={"sparkles"}>
            ⚡️
          </span>
        </h1>
        <img src={process.env.PUBLIC_URL + "/logo.png"} alt={"email logo"} />
        <p>
          <span role={"img"} aria-label={"sparkles"}>
            🐣
          </span>{" "}
          Collect feedback from your users
            {" "}
          <span role={"img"} aria-label={"note"}>
            🎉
          </span>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Landing);
