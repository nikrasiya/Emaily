import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        <SurveyList />
        <div
          style={{ marginRight: "200px", marginBottom: "20px" }}
          className={"fixed-action-btn"}
        >
          <Link
            to={"/surveys/new"}
            className="btn-floating btn-large waves-effect waves-light"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Dashboard);
