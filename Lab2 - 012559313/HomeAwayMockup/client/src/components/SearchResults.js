import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    let properties = this.generateProperties()
    this.pages = []
    while (properties.length) {
      this.pages.push(properties.splice(0, 10))
    }
    this.state = {
      page: 0,
    }
  }
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
  handlePrevPage = () => {
    if (this.state.page > 0)
      this.setState({ page: --this.state.page })
  }
  handleNextPage = () => {
    if (this.state.page < this.pages.length - 1) {
      this.setState({ page: ++this.state.page })
    }
  }
  render() {
    if (this.props.results.length)
      return (
        <div>
          { this.pages[this.state.page] }
          <p>Page { this.state.page + 1 } / { this.pages.length }</p>
          <button onClick={ this.handlePrevPage }>Prev</button>
          <button onClick={ this.handleNextPage }>Next</button>
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
