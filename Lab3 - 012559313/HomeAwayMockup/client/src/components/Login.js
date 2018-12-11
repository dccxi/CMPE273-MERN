import React from 'react'
import { Link } from 'react-router-dom'
import { login } from '../actions/'

class Login extends React.Component {
  constructor(props) {
    super(props)
    localStorage.removeItem('token')
    this.state = {
      email: "",
      password: ""
    }
  }
  validateForm() {
    return this.state.email.length && this.state.password.length
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = e => {
    e.preventDefault()
    let user = (({ email, password }) => ({ email, password }))(this.state)
    login(user)
  }
  render() {
    return (
      <div className='login'>
        <h2>Log in to HomeAway (mockup)</h2>
        <p>
          Need an account?
          <Link to='/signup'>Sign up</Link>
        </p>
        <form>
          <div>
            <label hidden>Email</label>
            <input name='email' type='email' placeholder='Email' onChange={ this.handleChange } required />
          </div>
          <div>
            <label hidden>Password</label>
            <input name='password' type='password' placeholder='Password' onChange={ this.handleChange } required />
          </div>
          <button
            disabled={ !this.validateForm() }
            onClick={ this.onSubmit }
            type="submit"
          >Login</button>
        </form>
      </div>
    )
  }
}

export default Login
