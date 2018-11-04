import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, logout } from '../actions/'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.props.onLogOut()
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
    let re = /\S+@\S+\.\S+/
    if (re.test(user.email))
      this.props.onLogIn(user)
    else
      alert('Please use a valid email address')
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

const mapDispatchToProps = dispatch => ({
  onLogIn(user) {
    dispatch(
      login(user)
    )
  },
  onLogOut() {
    dispatch(
      logout()
    )
  }
})

export default connect(null, mapDispatchToProps)(Login)
