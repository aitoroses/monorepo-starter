import * as React from 'react'

import BaseForm from './BaseForm'

export interface IProps {
    name: string
    onCreate: any
    hidden?: boolean
    loading?: boolean
}

export default class Create extends React.Component<IProps, any> {

    render() {
        return (
            <BaseForm
                hidden={this.props.hidden}
                loading={this.props.loading}
                name={this.props.name}
                title="Create request"
                actionName="create"
                onAction={this.props.onCreate}
            />
        )
    }
}
