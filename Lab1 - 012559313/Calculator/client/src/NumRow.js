import React, { Component } from 'react'

export default class NumRow extends Component {
  render() {
    return (
      <div className={ this.props.name }>
        <button onClick={ this.props.buttonHandler }
          value={ this.props.values[0] }>
          { this.props.values[0] }
        </button>
        <button onClick={ this.props.buttonHandler }
          value={ this.props.values[1] }>
          { this.props.values[1] }
        </button>
        <button onClick={ this.props.buttonHandler }
          value={ this.props.values[2] }>
          { this.props.values[2] }
        </button>
        <button onClick={ this.props.buttonHandler }
          value={ this.props.values[3] }>
          { this.props.values[3] }
        </button>
      </div>
    )
  }
}
