import * as React from 'react'
import { render } from 'react-dom'

import  { Root } from './app.component'

export function bootstrap(target: HTMLElement) {

    if (target) {
        render(
            <Root />,
            target
        )
    } else {
        console.warn("Care there's no #root element")
    }
}
