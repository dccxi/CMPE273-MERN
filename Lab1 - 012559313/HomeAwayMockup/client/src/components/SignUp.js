import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Welcome from './Welcome'
import { register } from '../actions/'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
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
    this.props.register(user)
  }
  build_input = attr => {
    return (
      <input name={ attr[0] } type={ attr[1] } placeholder={ attr[2] } key={ attr[3] } onChange={ this.handleChange } required />
    )
  }
  render() {
    if (this.props.registeredSuccess)
      return (
        <Welcome />
      )
    else {
      const required_input = [['firstName', 'text', 'First Name', '0'], ['lastName', 'text', 'Last Name', '1'], ['email', 'email', 'Email', '2'], ['password', 'password', 'Password', '3']]
      // const optional_input = [['phone', 'tel', 'Phone Number', '4'], ['city', 'text', 'City', '5'], ['about', 'text', 'About Me', '6']]
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

const mapStateToProps = (state) => (
  { registeredSuccess: state.auth.registeredSuccess }
)


const mapDispatchToProps = dispatch => ({
  register(user) {
    dispatch(
      register(user)
    )
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
