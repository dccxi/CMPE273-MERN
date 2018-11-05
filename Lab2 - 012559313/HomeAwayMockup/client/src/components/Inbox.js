import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class Inbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sender: '',
      receiver: '',
      message: '',
      reply: ''
    }
    this.counter = 0
  }
  componentWillMount() {
    const token = localStorage.getItem('token')
    axios({
      method: 'get',
      url: '/message',
      headers: {
        Authorization: token,
      }
    }).then(res => {
      console.log('messages pulled')
      this.setState(res.data)
    })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleReply = e => {
    let message = this.state.message
    message.push(this.state.reply)
    const token = localStorage.getItem('token')
    axios({
      method: 'post',
      url: '/message/reply',
      headers: {
        Authorization: token,
      },
      data: {
        sender: this.state.sender,
        receiver: this.state.receiver,
        message
      }
    }).then(res => {
      if (res.data.success) {
        console.log('message replied');
        alert('Message replied')
        this.props.history.push('/')
      }
    })
  }
  render() {
    let conversation = []
    for (let i in this.state.message) {
      conversation.push(
        <div key={ this.counter++ }>
          <h3>{ i % 2 === 0 ? this.state.sender : this.state.receiver }: </h3>
          <p>{ this.state.message[i] }</p>
        </div>
      )
    }
    if (conversation === []) {
      conversation = ['No massage']
    }
    return (
      <div>
        { conversation }
        <textarea
          placeholder="Reply"
          name='reply'
          onChange={ this.handleChange }
          value={ Buffer.from(this.state.reply || '').toString('utf8') }
        />
        <button onClick={ this.handleReply }>
          Reply
        </button>
      </div>
    )
  }
}


const mapStateToProps = (state) => (
  { myEmail: state.profile.email }
)

export default connect(mapStateToProps, null)(Inbox)
