import React from 'react'
import { getTrip } from '../services/queries'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'

class BookingDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookings: ['loading']
    }
    this.updated = false
    this.bookings = ['loading']
  }
  render() {
    const data = this.props.getTrip
    if (data.loading === false && this.updated === false) {
      this.updated = true
      this.bookings = []
      console.log('trips retrived', data.getTrip)
      if (data.getTrip.length)
        data.getTrip.forEach(booking => {
          this.bookings.push(
            <div key={ booking.houseId }>
              <h3>Id of the house booked:</h3>
              <p>{ booking.houseId }</p>
              <h3>The traveler's email is:</h3>
              <p>{ booking.traveler }</p>
              <hr />
            </div>
          )
        })
      else
        this.bookings = ['No bookings']
      this.setState({ bookings: this.bookings })
    }
    return (
      <div>
        <h2>Trip(s) booked:</h2>
        <hr />
        { this.bookings }
        <Link to='/'><button>Home</button></Link>
      </div>
    )
  }
}

export default compose(
  graphql(getTrip, { name: 'getTrip' })
)(BookingDashboard)
