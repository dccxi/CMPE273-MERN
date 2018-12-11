import { gql } from 'apollo-boost'

export const getProfile = gql`
  query {
    getProfile(email: "alice@alice.com") {
      firstName
      lastName
      email
      about
      city
      country
      company
      school
      hometown
      language
      phone
      isOwner
    }
  }
`

export const getProperty = gql`
  query {
    getProperty(email: "bob@bob.com") {
      propertyId
      location
      headline
      description
      owner
    }
  }
`

export const getTrip = gql`
  query {
    getTrip(email: "claire@claire.com") {
      houseId
      traveler
    }
  }
`
