import React from 'react'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      about: '',
      city: '',
      country: '',
      school: '',
      hometown: '',
      language: '',
      gender: ''
    }
  }
  render() {
    return (
      <div>
        <p>Displaying profile</p>
      </div>
    )
  }
}

export default Profile
