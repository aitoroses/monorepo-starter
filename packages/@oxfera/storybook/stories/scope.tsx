import { HelloComponent } from '@oxfera/core/src/app/hello/components/HelloComponent'
import * as React from 'react';

class Center extends React.Component<any, any> {
    render() {
        return <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {this.props.children}
        </div>
    }
}

export default {
    React,
    Center,
    HelloComponent: HelloComponent
}
