import React, { Component } from 'react'

export default class Display extends Component {
  render() {
    return (
      <div className="display">
        <p className="results">{ this.props.results }</p>
        <p className="inputs">{ this.props.inputs }</p>
      </div>
    )
  }
}
