import React, { Component } from 'react'
import spinner from '../spinner.gif'
import PropTypes from 'prop-types'

export default class Spinner extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
  }

  static defaultProps = {
    width: 30
  }

  render() {
    return (
      <div className='text-center'>
        <img src={spinner} alt='loading' style={{height: `${this.props.width}px`, width: `${this.props.width}px`}}/>
      </div>
    )
  }
}
