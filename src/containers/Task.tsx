
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ITask } from 'bss-hw-api'

import * as taskActions from '../actions/task'
import Auth from '../decorators/Auth'
import Approve from '../components/Approve'
import EditDraft from '../components/EditDraft'

import { userAndTaskSelector } from '../selectors/index'
import { Maybe } from 'tsmonad'

import { compose, prop } from 'ramda'

const getTaskDefinitionId = compose<ITask, any, string>(prop('taskDefinitionId'), prop('systemAttributes'))

export interface IProps {
    task: Maybe<ITask>
    user: Maybe<string>
    location
    dispatch
}

@Auth.container
@connect(userAndTaskSelector)
class Task extends React.Component<IProps, any> {

    public actions: typeof taskActions

    constructor(props) {
        super()
        this.actions = bindActionCreators(taskActions, props.dispatch)
    }

    componentDidMount() {
        const taskId = this.props.location.query.bpmWorklistTaskId
        this.actions.fetchTask(taskId)
    }

    handleApprove = (e) => {
        this.actions.requestTaskUpdate('APPROVE')
    }

    handleSubmit = (e) => {
        this.actions.requestTaskUpdate('SUBMIT')
    }

    render() {

        let taskDef = this.props.task.map(getTaskDefinitionId)

        return taskDef.caseOf({
            nothing: () => <div></div>,
            just: definition => {
                switch (definition) {

                    case "default/eAppKernel!1.0/EditDraftHumanTask":
                        return (
                            <EditDraft
                                name={this.props.user.valueOr('anonymous')}
                                onSubmit={this.handleSubmit}
                                />
                        )

                    case "default/eAppKernel!1.0/ApproveHumanTask":
                        return (
                            <Approve
                                name={this.props.user.valueOr('anonymous')}
                                onApprove={this.handleApprove}
                                />
                        )

                    default:
                        return <div>Not a valid <strong>TaskDefinitionID</strong></div>
                }
            }
        })
    }
}

export default Task
