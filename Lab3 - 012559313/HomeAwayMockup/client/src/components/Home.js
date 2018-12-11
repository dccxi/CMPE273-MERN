import React from 'react'
import { Link } from 'react-router-dom'
import { bookTrip } from '../services/mutations'
import { graphql, compose } from 'react-apollo'

class Home extends React.Component {
  handleLogout = e => {
    localStorage.removeItem('token')
    console.log('signed out')
    this.props.history.push('/')
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = e => {
    e.preventDefault()
    this.props.bookTrip({
      variables: {
        houseId: e.target.value
      }
    })
    console.log("booked property", e.target.value)
    alert("Property with id " + e.target.value + " booked")
  }
  render() {
    return (
      <div>
        <nav>
          <Link to='/profile'><button>Profile</button></Link>
          <Link to='/propdash'><button>Dashboard (Properties)</button></Link>
          <Link to='/bookingdash'><button>Dashboard (Bookings)</button></Link>
        </nav>
        <hr />
        <p>Property 1, Owner: Alice <button onClick={ this.onSubmit } value="1">Book it</button></p>
        <p>Property 2, Owner: Bob <button onClick={ this.onSubmit } value="2">Book it</button></p>
        <hr />
        <button onClick={ this.handleLogout }>Logout</button>
        <hr />
      </div>
    )
  }
}


export default compose(
  graphql(bookTrip, { name: 'bookTrip' })
)(Home)
