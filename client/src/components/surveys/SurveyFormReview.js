import React, { Component } from "react";
import { connect } from "react-redux";
import FIELDS from "./formFields";
import { submitSurvey } from "../../actions";
import { withRouter } from "react-router-dom";

class SurveyFormReview extends Component {
  renderFields() {
    const { formValues } = this.props;
    return FIELDS.map(field => {
      const { label, name } = field;
      return (
        <div key={name} style={{ marginTop: "15px" }}>
          <label>{label}</label>
          <div style={{ marginTop: "10px" }}>{formValues[name]}</div>
        </div>
      );
    });
  }

  renderButtons() {
    const { onCancel, submitSurvey, formValues, history } = this.props;
    return (
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={onCancel}
          className={"cyan darken-4 btn"}
          type={"submit"}
        >
          Cancel
          <i className={"material-icons right"}>cancel</i>
        </button>
        <button
          onClick={() => submitSurvey(formValues, history)}
          className={"btn right"}
          type={"submit"}
        >
          Send Survey
          <i className={"material-icons right"}>email</i>
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h5 style={{ marginBottom: "30px" }}>
          Please review before submitting
          <span role={"img"} aria-label={"check"}>
            🕵🏼‍♂️
          </span>
        </h5>
        {this.renderFields()}
        {this.renderButtons()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(
  mapStateToProps,
  { submitSurvey }
)(withRouter(SurveyFormReview));
