import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
  type User {
    firstName: String
    lastName: String
    email: String
    passwordHash: String
    phone: String
    about: String
    city: String
    country: String
    company: String
    school: String
    hometown: String
    language: String
    gender: String
    isOwner: Boolean
  }
  type Property {
    propertyId: String
    location: String
    headline: String
    description: String
    type: String
    bedrooms: Int
    accommodates: Int
    bathrooms: Int
    bookingOption: Int
    rate: Int
    minimumStay:Int
    startDate: String
    endDate: String
    owner: String
  }
  type Trip {
    traveler: String
    startDate: String
    endDate: String
    houseId: String
  }
  input UserInput {
    firstName: String
    lastName: String
    email: String
    passwordHash: String
    phone: String
    about: String
    city: String
    country: String
    company: String
    school: String
    hometown: String
    language: String
    gender: String
    isOwner: Boolean
  }
  input PropertyInput {
    propertyId: String
    location: String
    headline: String
    description: String
    type: String
    bedrooms: Int
    accommodates: Int
    bathrooms: Int
    bookingOption: Int
    rate: Int
    minimumStay:Int
    startDate: String
    endDate: String
    owner: String
  }
  input TripInput {
    traveler: String
    startDate: String
    endDate: String
    houseId: String
  }
  type Query {
    getProfile(email: String): User,
    getProperty(email: String): [Property],
    getTrip(email: String): [Trip]
  }
  type Mutation {
    updateProfile(input: UserInput): User,
    bookTrip(houseId: String): String
  }
`

export const schema = makeExecutableSchema({ typeDefs, resolvers })
