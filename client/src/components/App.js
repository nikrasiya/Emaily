import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import { fetchUser } from "../actions";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <div className={"container"}>
          <BrowserRouter>
            <div>
              <Header />
              <Route exact path={"/"} component={Landing} />
              <Route exact path={"/surveys"} component={Dashboard} />
              <Route path={"/surveys/new"} component={SurveyNew} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
