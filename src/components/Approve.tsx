import * as React from 'react'

import BaseForm from './BaseForm'

export interface IProps {
    name: string
    onApprove: Function
    hidden?: boolean
    loading?: boolean
}

export default class Approve extends React.Component<IProps, any> {

    render() {
        return (
            <BaseForm
                hidden={this.props.hidden}
                loading={this.props.loading}
                name={this.props.name}
                title="Approve request"
                actionName="approve"
                onAction={this.props.onApprove}
            />
        )
    }
}
