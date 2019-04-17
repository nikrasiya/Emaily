import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div className={"row"} style={{ marginTop: "30px" }}>
        <div className={"col s7"}>{this.renderContent()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

// !!! IMPORTANT !!!
// surveyForm is used to dump all form values on unmount
// by default surveyForm dumps all values
export default connect(mapStateToProps)(
  reduxForm({ form: "surveyForm" })(SurveyNew)
);
