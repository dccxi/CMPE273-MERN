import React from 'react'
import axios from 'axios'

export default class TravelerDash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: []
    }
  }
  componentWillMount() {
    const token = localStorage.getItem('token')
    axios({
      method: 'get',
      url: '/trip',
      headers: {
        Authorization: token,
      }
    }).then(res => {
      let trips = []
      if (res.data.length)
        res.data.forEach(trip => {
          trips.push(
            <div key={ trip.houseId }>
              <h3>Id of the house booked:</h3>
              <p>{ trip.houseId }</p>
              <h3>Start at:</h3>
              <p>{ trip.startDate.substring(0, 10) }</p>
              <h3>End at:</h3>
              <p>{ trip.endDate.substring(0, 10) }</p>
              <hr />
            </div>
          )
        })
      else
        trips = ['No trip']
      this.setState({ trips })
    })
  }
  render() {
    return (
      <div>
        <h2>Trips planned:</h2>
        { this.state.trips }
      </div>
    )
  }
}
