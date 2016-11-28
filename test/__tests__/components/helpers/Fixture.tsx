import * as React from 'react'
import MuiThemeProvider from '../../../../src/decorators/MuiThemeProvider'

const injectTapEventPlugin = require('react-tap-event-plugin')
injectTapEventPlugin()

/**
 * This decorator is used for MUI components that require a MuiTheme to work correctly
 * @param {React.Component} DecoratedComponent Component to be decorated with @MuiThemeProvider()
 */
export function FixtureDecorator(DecoratedComponent: any): any {
    @MuiThemeProvider()
    class FixtureDecoratorClass extends React.Component<any, any> {
        render() {
            return <DecoratedComponent {...this.props} />
        }
    }
    return FixtureDecoratorClass
}

@FixtureDecorator
export class Fixture extends React.Component<any, any> {
    render() {
        return this.props.children
    }
}
