import React from 'react'
import { getProperty } from '../services/queries'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'

class PropDash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: ['loading']
    }
    this.updated = false
    this.properties = ['loading']
  }
  render() {
    const data = this.props.getProperty
    if (data.loading === false && this.updated === false) {
      this.updated = true
      this.properties = []
      console.log('properties retrived', data.getProperty)
      if (data.getProperty.length)
        data.getProperty.forEach(property => {
          this.properties.push(
            <div key={ property.propertyId }>
              <h3>Id of the property listed:</h3>
              <p>{ property.propertyId }</p>
              <h3>Location of the property</h3>
              <p>{ property.location }</p>
              <h3>Headline</h3>
              <p>{ property.headline }</p>
              <hr />
            </div>
          )
        })
      else
        this.properties = ['No property']
      this.setState({ properties: this.properties })
    }
    return (
      <div>
        <h2>Property(s) listed:</h2>
        <hr />
        { this.properties }
        <Link to='/'><button>Home</button></Link>
      </div>
    )
  }
}

export default compose(
  graphql(getProperty, { name: 'getProperty' })
)(PropDash)
