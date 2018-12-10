import React from 'react'
import { connect } from 'react-redux'
import { getProfile, updateProfile } from '../actions/'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.props.onGetProfile()
    this.state = {
      image: '',
      firstName: '',
      lastName: '',
      phone: '',
      about: '',
      city: '',
      country: '',
      company: '',
      school: '',
      hometown: '',
      language: '',
      gender: ''
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState(newProps.profile)
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  validateForm = () => {
    return this.state.firstName.length && this.state.lastName.length
  }
  onSubmit = e => {
    e.preventDefault()
    this.props.onUpdateProfile(this.state)
  }
  render() {
    return (
      <div>
        <h2>Profile information</h2>
        <div>
          <input
            type='text'
            placeholder='First Name'
            name='firstName'
            onChange={ this.handleChange }
            value={ this.state.firstName } required
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Last Name'
            name='lastName'
            onChange={ this.handleChange }
            value={ this.state.lastName } required
          />
        </div>
        <div>
          <textarea
            placeholder='About me'
            name='about'
            onChange={ this.handleChange }
            value={ Buffer.from(this.state.about || '').toString('utf8') }
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='City'
            name='city'
            onChange={ this.handleChange }
            value={ this.state.city }
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Country'
            name='country'
            onChange={ this.handleChange }
            value={ this.state.country }
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Company'
            name='company'
            onChange={ this.handleChange }
            value={ this.state.company }
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='School'
            name='school'
            onChange={ this.handleChange }
            value={ this.state.school }
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Hometown'
            name='hometown'
            onChange={ this.handleChange }
            value={ this.state.hometown }
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Language'
            name='language'
            onChange={ this.handleChange }
            value={ this.state.language }
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Phone Number'
            name='phone'
            onChange={ this.handleChange }
            value={ this.state.phone }
          />
        </div>
        <div>
          <select
            name='gender'
            onChange={ this.handleChange }
            value={ this.state.gender }
          >
            <option disabled hidden value=''>Gender</option>
            <option value='female'>Female</option>
            <option value='male'>Male</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <div>
          <button
            disabled={ !this.validateForm() }
            onClick={ this.onSubmit }
            type="submit"
          >Save changes</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  { profile: state.profile }
)

const mapDispatchToProps = dispatch => ({
  onGetProfile() {
    dispatch(
      getProfile()
    )
  },
  onUpdateProfile(userProfile) {
    dispatch(
      updateProfile(userProfile)
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
