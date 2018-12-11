import { gql } from 'apollo-boost'

export const updateProfile = gql`
  mutation User($email: String,$firstName: String,$lastName: String) {
    updateProfile(input:{email: $email,firstName: $firstName,lastName: $lastName}) {
        firstName
        lastName
      }
    }
`
export const bookTrip = gql`
  mutation User($houseId: String) {
    bookTrip(houseId: $houseId)
  }
`
