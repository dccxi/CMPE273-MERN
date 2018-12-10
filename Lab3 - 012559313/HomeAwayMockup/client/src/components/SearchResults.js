import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class SearchResults extends React.Component {
  generateProperties = () => {
    let properties = []
    this.props.results.forEach(p => {
      properties.push(
        <div key={ p.propertyId }>
          <Link to={ `/detail/${p.propertyId}` }>{ p.headline }</Link>
          <hr />
        </div>
      )
    })
    return properties
  }
  render() {
    if (this.props.results.length)
      return (
        <div>
          { this.generateProperties() }
        </div>
      )
    else
      return (<h2>No Results</h2>)
  }
}

const mapStateToProps = (state) => (
  { results: state.property }
)

export default connect(mapStateToProps, null)(SearchResults)
