import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        Soil - React Fire
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};