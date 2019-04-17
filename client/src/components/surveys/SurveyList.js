import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderLastResponse(lastResponded) {
    if (lastResponded) {
      return new Date(lastResponded).toLocaleString();
    }
    return "No response yet!";
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className={"card darken-1"} key={survey._id}>
          <div className={"card-content"}>
            <span className={"card-title"}>{survey.title}</span>
            <p>{survey.body}</p>
            <p className={"right"}>
              <span role={"img"} aria-label={"note"}>
                🚀
              </span>{" "}
              <em>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</em>
            </p>
          </div>
          <div className={"card-action"}>
            <span style={{ paddingRight: "20px" }}>
              <span role={"img"} aria-label={"note"}>
                👍🏾
              </span>{" "}
              {survey.yes}
            </span>
            <span>
              <span role={"img"} aria-label={"note"}>
                👎🏾
              </span>{" "}
              {survey.no}
            </span>
            <span className={"right"}>
              <span role={"img"} aria-label={"note"}>
                ⏰{" "}
              </span>
              Last Response: {this.renderLastResponse(survey.lastResponded)}
            </span>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={"row"}>
        <div className={"col s9"}>{this.renderSurveys()}</div>
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
