import React, { Component } from 'react'
import NumRow from './NumRow'

export default class Numpad extends Component {
  render() {
    return (
      <div className="numpad">
        <NumRow name="row1"
          buttonHandler={ this.props.buttonHandler }
          values={ ['7', '8', '9', '/'] } />
        <NumRow name="row2"
          buttonHandler={ this.props.buttonHandler }
          values={ ['4', '5', '6', '*'] } />
        <NumRow name="row3"
          buttonHandler={ this.props.buttonHandler }
          values={ ['1', '2', '3', '-'] } />
        <NumRow name="row4"
          buttonHandler={ this.props.buttonHandler }
          values={ ['0', '.', '=', '+'] } />
      </div>
    )
  }
}
