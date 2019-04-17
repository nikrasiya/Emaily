import React, { Component } from "react";
import { connect } from "react-redux";

class SurveyField extends Component {
  render() {
    const {
      input,
      label,
      meta: { error, touched }
    } = this.props;

    return (
      <div>
        <label>{label} </label>
        <input
          {...input}
          autoComplete={"off"}
          style={{ marginBottom: "5px" }}
        />
        <div className={"red-text"} style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SurveyField);
