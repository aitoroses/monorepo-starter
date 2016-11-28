import * as React from 'react'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'

import { VectorWidget } from './VectorWidget'
import { BatmanLogo } from './MorphLogo'

export interface IProps {
    title: string
    name: string
    actionName: string
    onAction: any
    hidden?: boolean
    loading?: boolean
}

export default class BaseForm extends React.Component<IProps, any> {

    state = {
        times: 20
    }

    handleTouchTap = async (e) => {
        this.props.onAction(e)
    }

    handleLogoClick = () => {
        this.setState({ times: this.state.times - 1 })
    }

    renderContent() {
        if (this.props.hidden) {
            return (
                <div>
                    <CardText>Form has been correctly submitted.</CardText>
                </div>
            )
        } else {
            return (
                <div>
                    <CardTitle title={this.props.title}></CardTitle>
                    <CardText>
                        <p>Hello {this.props.name}</p>
                        <p>Please, {this.props.actionName} your request</p>
                        { this.state.times > 0
                            ? <VectorWidget onClick={this.handleLogoClick} />
                            : <BatmanLogo />
                        }
                        { this.state.times > 0
                            ? <h2>Click React's logo {this.state.times} and then create!</h2>
                            : <h1>BABABATTMAAAANNNN!!</h1>
                        }
                    </CardText>
                    <CardActions>
                    </CardActions>
                    <FlatButton
                        onClick={this.handleTouchTap}
                        label={this.props.actionName}>
                    </FlatButton>
                </div>
            )
        }
    }

    render() {

        return (
            <Card style={{
                position: 'relative',
                margin: 20,
                padding: 20
            }}>
                {this.props.loading
                    ? (<div style={{ position: 'absolute', height: '100%', width: '100%' }}>
                        <div class="sk-container">
                            <div class="sk-folding-cube">
                                <div class="sk-cube1 sk-cube"></div>
                                <div class="sk-cube2 sk-cube"></div>
                                <div class="sk-cube4 sk-cube"></div>
                                <div class="sk-cube3 sk-cube"></div>
                            </div>
                        </div>
                    </div>
                    ) : null
                }
                {this.renderContent() }
            </Card>
        )
    }
}
