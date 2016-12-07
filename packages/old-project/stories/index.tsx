import * as React from 'react';
import { storiesOf, action, addDecorator } from '@kadira/storybook';
const Playground = require('component-playground').default


const Button = React.createClass({

    getDefaultProps() {
        return {
            darkMode: false
        };
    },

    render() {
        console.log('hi')
        return (
            <button type="button" onClick={this.props.onClick} style={this.props.buttonStyle}>
            {this.props.children}
            </button>
        );
    }
});

const codeExample = `
    <Button buttonStyle={{
        background: '#3498db',
        border: 0,
        borderRadius: 3,
        boxShadow: '0px 5px 0px #2980b9',
        color: 'white',
        display: 'block',
        fontSize: 14,
        fontWeight: 'bold',
        margin: "20px auto",
        minWidth: 200,
        outline: 0,
        padding: 10
    }} onClick={action('hi')}>
        <p>My Button</p>
    </Button>
`

const CenterDecorator = (story) =>{
    return  (
        <div>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"/>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css"/>
            <div>
                {story()}
            </div>
        </div>
    )
};
addDecorator(CenterDecorator)

storiesOf('Button', module)
    .add('with text', () => {
            console.log(Playground)
            return (
                <Playground codeText={codeExample} scope={{action: action, React: React, Button: Button}}/>
            )
        }
    )
