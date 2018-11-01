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
    this.state = {
      houseId: this.props.match.params.id,
      startDate: moment(),
      endDate: moment().clone().add(1, 'days'),
      imageView: ''
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
      let imageView = 'data:image/jpg;base64, ' + res.data
      this.setState({ imageView })
    })
  }
  handleBook = e => {
    const token = localStorage.getItem('token')
    axios({
      method: 'post',
      url: '/postTrip',
      headers: {
        Authorization: token,
      },
      data: _.omit(this.state, ['imageView'])
    }).then(res => {
      console.log(res.data)
      this.props.history.push('/')
    })
  }
  handleChangeStart = date => {
    this.setState({
      startDate: date,
      endDate: date.clone().add(1, 'days')
    })
  }
  handleChangeEnd = date => {
    this.setState({
      endDate: date
    })
  }
  render() {
    let p = {}
    this.props.results.forEach(property => {
      if (property.propertyId === this.props.match.params.id)
        p = property
    })
    return (
      <div>
        <img src={ this.state.imageView } style={ { width: '300px' } } alt='property' />
        <h3>Name</h3>
        <p>{ p.headline }</p>
        <h3>Type</h3>
        <p>{ p.type }</p>
        <h3>Number of bedrooms</h3>
        <p>{ p.bedrooms }</p>
        <h3>Number of bathrooms</h3>
        <p>{ p.bathrooms }</p>
        <h3>Accommodates</h3>
        <p>{ p.accommodates }</p>
        <h3>Price</h3>
        <p>{ p.rate }</p>
        <hr />
        <div>
          <label>Arrive</label>
          <DatePicker
            selected={ this.state.startDate }
            selectsStart
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
            startDate={ this.state.startDate }
            endDate={ this.state.endDate }
            onChange={ this.handleChangeEnd }
            minDate={ this.state.endDate }
            showDisabledMonthNavigation
          />
        </div>
        <button onClick={ this.handleBook }>
          Book it
        </button>
      </div>

    )
  }
}

const mapStateToProps = (state) => (
  { results: state.property }
)

export default connect(mapStateToProps, null)(DetailView)
