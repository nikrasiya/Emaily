import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        {FIELDS.map(({ name, label }) => {
          return (
            <Field
              name={name}
              type={"text"}
              component={SurveyField}
              label={label}
              key={name}
            />
          );
        })}
      </div>
    );
  }

  renderButtons() {
    return (
      <div style={{ marginTop: "20px" }}>
        <Link to={"/surveys"}>
          <button className={"cyan darken-4 btn"} type={"submit"}>
            Cancel
            <i className={"material-icons right"}>cancel</i>
          </button>
        </Link>
        <button className={"btn right"} type={"submit"}>
          Next
          <i className={"material-icons right"}>done</i>
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h5 style={{ marginBottom: "30px" }}>
          Create a new Survey{" "}
          <span role={"img"} aria-label={"note"}>
            📝️
          </span>
        </h5>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          {this.renderButtons()}
        </form>
      </div>
    );
  }
}

// Method is part of redux form
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  FIELDS.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `${label} is required`;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(
  reduxForm({
    validate,
    form: "surveyForm",
    destroyOnUnmount: false
  })(SurveyForm)
);
