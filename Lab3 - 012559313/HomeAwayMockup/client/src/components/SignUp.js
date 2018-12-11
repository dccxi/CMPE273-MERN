import React from 'react'
import { Link } from 'react-router-dom'
import Welcome from './Welcome'
import { register } from '../actions/'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    localStorage.removeItem('token')
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isOwner: 0
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  validateForm() {
    return this.state.firstName.length && this.state.lastName.length && this.state.email.length && this.state.password.length
  }
  onSubmit = e => {
    e.preventDefault()
    let user = this.state
    register(user)
    this.props.history.push('/')
  }
  build_input = attr => {
    return (
      <input name={ attr[0] } type={ attr[1] } placeholder={ attr[2] } key={ attr[3] } onChange={ this.handleChange } required />
    )
  }
  changeCheckBox = e => {
    if (e.target.checked)
      this.setState({ isOwner: 1 })
    else
      this.setState({ isOwner: 0 })
  }
  render() {
    if (this.props.registeredSuccess)
      return (
        <Welcome>{ this.state.firstName }</Welcome>
      )
    else {
      const required_input = [['firstName', 'text', 'First Name', '0'], ['lastName', 'text', 'Last Name', '1'], ['email', 'email', 'Email', '2'], ['password', 'password', 'Password', '3']]
      return (
        <div className='signup'>
          <h2>Sign up for HomeAway (mockup)</h2>
          <p>
            Already have an account?
          <Link to='/login'>Log in</Link>
          </p>
          <div>
            { required_input.map(this.build_input) }
          </div>
          <div>
            <input
              type='checkbox'
              name='isOwner'
              onChange={ this.changeCheckBox }
            />
            <label>Are you a owner as well?</label>
          </div>
          <button
            disabled={ !this.validateForm() }
            onClick={ this.onSubmit }
            type="submit"
          >Sign Me Up</button>
        </div>
      )
    }
  }
}

export default SignUp
