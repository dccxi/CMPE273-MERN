import React from 'react'
import ImageUploader from 'react-images-upload'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import _ from 'lodash'
import { connect } from 'react-redux';
import { postProperty } from '../actions/'

class ListProperty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      headline: '',
      description: '',
      type: 'house',
      bedrooms: 2,
      accommodates: 6,
      bathrooms: 2,
      bookingOption: '',
      photos: [],
      rate: '',
      minimumStay: 1,
      startDate: moment(),
      endDate: moment().clone().add(1, 'days'),
    }
  }
  onDrop = (pictureFiles, pictureDataURLs) => {
    this.setState({
      photos: pictureFiles
    })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
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
  validateForm = () => (
    _.some(this.state, e => !e)
  )
  onSubmit = e => {
    e.preventDefault()
    console.log(this.state);
    postProperty(this.state)
  }
  render() {
    return (
      <div>
        <div>
          <h3>Address</h3>
          <input
            type='text'
            name='location'
            onChange={ this.handleChange }
            required
          />
          <span className="validity"></span>
        </div>
        <hr />
        <h3>Describe your property</h3>
        <div>
          <p>Headline</p>
          <input
            type='text'
            name='headline'
            onChange={ this.handleChange }
            minLength='20'
            maxLength='80'
            placeholder='minimum length of 20'
            required
          />
          <span className="validity"></span>
        </div>
        <div>
          <p>Description</p>
          <textarea
            name='description'
            onChange={ this.handleChange }
            minLength='40'
            maxLength='10000'
            placeholder='minimum length of 40'
            required
          />
          <span className="validity"></span>
        </div>
        <div>
          <p>Property Type</p>
          <select
            name='type'
            onChange={ this.handleChange }
            value={ this.state.type }
          >
            <option value='house'>House</option>
            <option value='apartment'>Apartment</option>
            <option value='condo'>Condo</option>
            <option value='studio'>Studio</option>
            <option value='townhouse'>Townhouse</option>
          </select>
        </div>
        <div>
          <p>Bedrooms</p>
          <input
            type='number'
            name='bedrooms'
            onChange={ this.handleChange }
            value={ this.state.bedrooms }
          />
        </div>
        <div>
          <p>Accommodates</p>
          <input
            type='number'
            name='accommodates'
            onChange={ this.handleChange }
            value={ this.state.accommodates }
          />
        </div>
        <div>
          <p>Bathrooms</p>
          <input
            type='number'
            name='bathrooms'
            onChange={ this.handleChange }
            value={ this.state.bathrooms }
          />
        </div>
        <hr />
        <div>
          <h3>Booking options</h3>
          <p>Select a booking method</p>
          <div>
            <input
              type='radio'
              name='bookingOption'
              id='instant'
              value='1'
              onChange={ this.handleChange }
              required
            />
            <label htmlFor='instant'>Instant Booking (Recommended)</label>
          </div>
          <div>
            <input
              type='radio'
              name='bookingOption'
              id='review'
              value='2'
              onChange={ this.handleChange }
            />
            <label htmlFor='review'>24-hour review</label>
          </div>
        </div>
        <hr />
        <div>
          <h3>Photos</h3>
          <ImageUploader
            withIcon={ true }
            withPreview={ true }
            buttonText='Choose images'
            onChange={ this.onDrop }
            imgExtension={ ['.jpg', '.gif', '.png', '.gif'] }
            maxFileSize={ 5242880 }
          />
        </div>
        <hr />
        <div>
          <h3>How much do you want to charge?</h3>
          <div>
            <label>Nightly Base Rate ($)</label>
            <input
              type='number'
              name='rate'
              onChange={ this.handleChange }
              required
            />
            <span className="validity"></span>
          </div>
          <div>
            <label>Minimum stay</label>
            <input
              type='number'
              name='minimumStay'
              onChange={ this.handleChange }
              value={ this.state.minimumStay }
            />
            <span className="validity"></span>
          </div>
        </div>
        <hr />
        <div>
          <h3>Select the dates your property will be available</h3>
          <div>
            <label>Start Date</label>
            <DatePicker
              selected={ this.state.startDate }
              selectsStart
              startDate={ this.state.startDate }
              endDate={ this.state.endDate }
              onChange={ this.handleChangeStart }
            />
          </div>
          <div>
            <label>End Date</label>
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
        <hr />
        <button
          disabled={ this.validateForm() }
          onClick={ this.onSubmit }
          type='submit'
        >List My Property</button>
      </div>
    )
  }
}

export default connect(null, null)(ListProperty)
