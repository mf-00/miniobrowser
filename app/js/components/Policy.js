import { READ_ONLY, WRITE_ONLY, READ_WRITE } from '../actions'

import React, { Component, PropTypes } from 'react'
import connect from 'react-redux/lib/components/connect'
import classnames from 'classnames'
import * as actions from '../actions'

class Policy extends Component {
  constructor(props, context) {
      super(props, context)
      this.state = {}
  }

  handlePolicyChange(e) {
      this.setState({ policy: { policy: e.target.value }})
  }

  removePolicy(e) {
      e.preventDefault()
      const { dispatch, currentBucket, prefix } = this.props
      let newPrefix = prefix.replace(currentBucket+'/', '')
      newPrefix = newPrefix.replace('*', '')
      web.SetBucketPolicy({
          bucketName: currentBucket,
          prefix: newPrefix,
          policy: 'none'
      })
      .then(() => dispatch(actions.removePolicy(currentBucket, newPrefix)))
      .catch(e => dispatch(actions.showAlert({
        type: 'danger',
        message: e.message,
      })))
  }

  render() {
    const { policy, prefix, currentBucket } = this.props
    let newPrefix = prefix.replace(currentBucket+'/', '')
    newPrefix = newPrefix.replace('*', '')

    return (
      <div className="pmb-list">
          <div className="pmbl-item">{newPrefix}</div>
          <div className="pmbl-item">
            <select className="form-control"
                    value={policy}
                    onChange={this.handlePolicyChange.bind(this)}>
              <option value={READ_ONLY}>Read Only</option>
              <option value={WRITE_ONLY}>Write Only</option>
              <option value={READ_WRITE}>Read and Write</option>
            </select>
          </div>

          <div className="pmbl-item">
            <button className="btn btn-block btn-danger" onClick={this.removePolicy.bind(this)}>Remove</button>
          </div>
      </div>
    )
  }
}

export default connect(state => state)(Policy)
