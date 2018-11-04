import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { logout, getProfile, search } from '../actions/'
import _ from 'lodash'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      startDate: moment(),
      endDate: moment().clone().add(1, 'days'),
      guest: 1
    }
  }
  handleLogout = e => {
    logout()
    this.props.history.push('/')
  }
  componentWillMount = () => {
    this.props.onGetProfile()
  }
  ownerOnly = () => {
    if (this.props.isOwner)
      return (
        <span>
          <Link to='/list'><button>List Property</button></Link>
          <Link to='/ownerdash'><button>Owner Dashboard</button></Link>
        </span>
      )
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  validateForm = () => (
    _.some(this.state, e => !e)
  )
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
  onSubmit = e => {
    this.props.onSearch(this.state)
  }
  render() {
    return (
      <div>
        <nav>
          <Link to='/profile'><button>Profile</button></Link>
          <Link to='/dashboard'><button>Traveler Dashboard</button></Link>
          <Link to='/inbox'><button>Inbox</button></Link>
          { this.ownerOnly() }
        </nav>
        <hr />
        <div>
          <div>
            <h3>Where do you want to go?</h3>
            <input
              type='text'
              name='location'
              onChange={ this.handleChange }
              required
            />
          </div>
          <div>
            <h3>Select dates</h3>
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
          </div>
          <div>
            <h3>Number of guest</h3>
            <input
              type='number'
              name='guest'
              min='1'
              max='10'
              onChange={ this.handleChange }
              value={ this.state.guest }
            />
          </div>
          <button disabled={ this.validateForm() } onClick={ this.onSubmit }>Search</button>
        </div>
        <hr />
        <button onClick={ this.handleLogout }>Logout</button>
        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  { isOwner: state.profile.isOwner }
)

const mapDispatchToProps = dispatch => ({
  onGetProfile() {
    dispatch(
      getProfile()
    )
  },
  onSearch(input) {
    dispatch(
      search(input)
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
