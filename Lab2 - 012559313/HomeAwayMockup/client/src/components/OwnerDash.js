import React from 'react'
import axios from 'axios'

export default class OwnerDash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookings: []
    }
  }
  componentWillMount() {
    const token = localStorage.getItem('token')
    axios({
      method: 'get',
      url: '/trip/booking',
      headers: {
        Authorization: token,
      }
    }).then(res => {
      let bookings = []
      if (res.data.length)
        res.data.forEach(booking => {
          bookings.push(
            <div key={ booking.houseId }>
              <h3>Id of the house booked:</h3>
              <p>{ booking.houseId }</p>
              <h3>Start at:</h3>
              <p>{ booking.startDate.substring(0, 10) }</p>
              <h3>End at:</h3>
              <p>{ booking.endDate.substring(0, 10) }</p>
              <h3>The traveler's email is:</h3>
              <p>{ booking.traveler }</p>
              <hr />
            </div>
          )
        })
      else
        bookings = ['No bookings']
      this.setState({ bookings })
    })
  }
  render() {
    return (
      <div>
        <h2>Properties booked:</h2>
        { this.state.bookings }
      </div>
    )
  }
}
