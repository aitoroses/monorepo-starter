import * as React from 'react'
import { connect } from 'react-redux'
import { getMessage } from '../selectors'

export const HelloComponent = ({message}) => (
    <div>
        {message}
    </div>
)

export default connect(getMessage)(HelloComponent)
