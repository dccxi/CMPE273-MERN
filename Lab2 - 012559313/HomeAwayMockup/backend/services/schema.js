import config from '../config'
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
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
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
    type: Boolean,
    required: true
  }
})

export const Properties = mongoose.model('Properties', {
  photos: {
    type: String,
    required: true
  },
  propertyId: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  accommodates: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  bookingOption: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  minimumStay: {
    type: Number,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  }
})

export const Trips = mongoose.model('Trips', {
  traveler: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  houseId: {
    type: String,
    required: true
  }
})
