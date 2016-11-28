import * as React from 'react'

import BaseForm from './BaseForm'

export interface IProps {
    name: string
    onSubmit: Function
    hidden?: boolean
    loading?: boolean
}

export default class EditDraft extends React.Component<IProps, any> {

    render() {
        return (
            <BaseForm
                hidden={this.props.hidden}
                loading={this.props.loading}
                name={this.props.name}
                title="Request Draft"
                actionName="submit"
                onAction={this.props.onSubmit}
            />
        )
    }
}
