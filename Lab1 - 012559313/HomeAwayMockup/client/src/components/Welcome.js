import React from 'react'
import { Link } from 'react-router-dom'

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h2>Thank you for creating an account</h2>
        <h3>Welcome <strong>Tong Wu</strong></h3>
        <hr />
        <p>Please take a few moments to <Link to='/profile'>update your profile</Link> with a picture and a few details about yourself. Property owners are more likely to respond more quickly to travelers with profiles.</p>
        <hr />
        <Link to='/'><button>Skip</button></Link>
        <Link to='/profile'><button>Update Your Profile</button></Link>
      </div>
    )
  }
}
