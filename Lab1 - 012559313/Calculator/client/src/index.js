import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Numpad from './Numpad'
import Display from './Display'
import './calculator.css'

class Calc extends Component {
  constructor() {
    super()
    this.state = {
      inputs: '',
      results: ''
    }
  }
  isSymbol = str => {
    if (str === '+' || str === '-' || str === '*' || str === '/') return true
    else return false
  }
  reset = () => {
    this.setState({ inputs: '', results: '' })
  }
  updateInputs = value => {
    if (value === '=') {
      if (this.state.inputs.length > 0) this.equationHandler()
    } else if (this.isSymbol(value)) {
      if (this.state.inputs.length > 0) {
        let last_input = this.state.inputs.slice(-1)
        if (!this.isSymbol(last_input)) {
          this.setState({ inputs: this.state.inputs + value })
        } else {
          this.setState({ inputs: this.state.inputs.replace(/.$/, value) })
        }
      }
    } else {
      this.setState({ inputs: this.state.inputs + value })
    }
  }
  buttonHandler = e => {
    let value = e.target.value
    if (this.state.results !== '') {
      this.setState({ inputs: '', results: '' }, () => this.updateInputs(value))
    } else {
      this.updateInputs(value)
    }
  }
  equationHandler = () => {
    const { inputs } = this.state
    fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: inputs })
    }).then(res => res.json())
      .then(res => {
        this.setState({ results: res.results })
      })
  }
  render() {
    return (
      <div className="calculator">
        <Display results={ this.state.results } inputs={ this.state.inputs } />
        <Numpad buttonHandler={ this.buttonHandler } />
      </div>
    )
  }
}

ReactDOM.render(
  <Calc />,
  document.getElementById('root')
)
