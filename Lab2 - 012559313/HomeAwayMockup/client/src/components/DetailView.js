import React from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

class DetailView extends React.Component {
  constructor(props) {
    super(props)
    this.props.results.forEach(property => {
      if (property.propertyId === this.props.match.params.id)
        this.property = property
    })
    this.startDate = this.props.date.startDate
    this.endDate = this.props.date.endDate
    this.state = {
      houseId: this.props.match.params.id,
      startDate: moment(this.startDate),
      endDate: moment(this.endDate),
      imageView: '',
      message: ''
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('token')
    axios({
      method: 'get',
      url: '/image/' + this.props.match.params.id,
      headers: {
        Authorization: token,
      }
    }).then(res => {
      let imageView = res.data.split(',')
      this.setState({ imageView })
    })
  }
  handleBook = e => {
    if (this.props.myEmail === this.property.owner)
      alert('Cannot book your own property')
    else {
      const token = localStorage.getItem('token')
      axios({
        method: 'post',
        url: '/trip',
        headers: {
          Authorization: token,
        },
        data: _.omit(this.state, ['imageView', 'message'])
      }).then(res => {
        if (res.data.success) {
          alert('Trip booked')
          this.props.history.push('/')
        }
      })
    }
  }
  handleChangeStart = date => {
    this.setState({
      startDate: date,
      // endDate: date.clone().add(1, 'days')
    })
  }
  handleChangeEnd = date => {
    this.setState({
      endDate: date
    })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleMessage = e => {
    if (this.props.myEmail === this.property.owner)
      alert('Cannot send message to yourself')
    else {
      const token = localStorage.getItem('token')
      axios({
        method: 'post',
        url: '/message',
        headers: {
          Authorization: token,
        },
        data: {
          receiver: this.property.owner,
          message: [this.state.message]
        }
      }).then(res => {
        if (res.data.success) {
          console.log('message sent');
          alert('Message sent')
          this.props.history.push('/')
        }
      })
    }
  }
  render() {
    let imageView = Array.from(this.state.imageView)
    const renderImages = imageView.map(
      (img, i) => <img src={ img } style={ { width: '300px' } } alt='property' key={ i } />
    )
    return (
      <div>
        { renderImages }
        <h3>Name</h3>
        <p>{ this.property.headline }</p>
        <h3>Type</h3>
        <p>{ this.property.type }</p>
        <h3>Number of bedrooms</h3>
        <p>{ this.property.bedrooms }</p>
        <h3>Number of bathrooms</h3>
        <p>{ this.property.bathrooms }</p>
        <h3>Accommodates</h3>
        <p>{ this.property.accommodates }</p>
        <h3>Price</h3>
        <p>{ this.property.rate }</p>
        <hr />
        <div>
          <label>Arrive</label>
          <DatePicker
            selected={ this.state.startDate }
            selectsStart
            minDate={ this.startDate }
            maxDate={ this.endDate }
            startDate={ this.state.startDate }
            endDate={ this.state.endDate }
            onChange={ this.handleChangeStart }
          />
        </div>
        <div>
          <label>Depart</label>
          <DatePicker
            selected={ this.state.endDate }
            selectsEnd
            minDate={ this.startDate }
            maxDate={ this.endDate }
            startDate={ this.state.startDate }
            endDate={ this.state.endDate }
            onChange={ this.handleChangeEnd }
            showDisabledMonthNavigation
          />
        </div>
        <button onClick={ this.handleBook }>
          Book it
        </button>
        <h2>Send a message to owner:</h2>
        <textarea
          placeholder="Message to owner"
          name='message'
          onChange={ this.handleChange }
          value={ Buffer.from(this.state.message || '').toString('utf8') }
        />
        <button onClick={ this.handleMessage }>
          Message Property Owner
        </button>
      </div>

    )
  }
}

const mapStateToProps = (state) => (
  {
    myEmail: state.profile.email,
    results: state.property,
    date: state.date
  }
)

export default connect(mapStateToProps, null)(DetailView)
