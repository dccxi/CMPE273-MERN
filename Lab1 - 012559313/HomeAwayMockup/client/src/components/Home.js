import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/'

class Home extends React.Component {
  handleLogout = e => {
    this.props.onLogOut()
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <p>testtest</p>
        <button onClick={ this.handleLogout }>Logout</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onLogOut() {
    dispatch(
      logout()
    )
  }
})

export default connect(null, mapDispatchToProps)(Home)
