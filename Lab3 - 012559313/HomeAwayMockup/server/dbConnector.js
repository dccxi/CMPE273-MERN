import config from './config'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 100
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '))

export const Users = mongoose.model('Users', {
  email: {
    type: String,
    unique: true
  },
  passwordHash: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String,
    required: false
  },
  about: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  company: {
    type: String,
    required: false
  },
  school: {
    type: String,
    required: false
  },
  hometown: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  isOwner: {
    type: Boolean
  }
})

export const Properties = mongoose.model('Properties', {
  propertyId: {
    type: String,
    unique: true
  },
  location: {
    type: String
  },
  headline: {
    type: String
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  bedrooms: {
    type: Number
  },
  accommodates: {
    type: Number
  },
  bathrooms: {
    type: Number
  },
  bookingOption: {
    type: Number
  },
  rate: {
    type: Number
  },
  minimumStay: {
    type: Number
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  owner: {
    type: String
  }
})

export const Trips = mongoose.model('Trips', {
  traveler: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  houseId: {
    type: String
  }
})
