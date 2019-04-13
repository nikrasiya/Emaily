import React, {Component} from 'react';
import {connect} from 'react-redux';

class Landing extends Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>
                    Emaily!
                </h1>
                <p>
                    Collect feedback from your users
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Landing);
