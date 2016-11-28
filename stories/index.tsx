import * as React from 'react';
import { storiesOf, action, addDecorator } from '@kadira/storybook';

// MUI Theme decorator
addDecorator((story) => (
    <Fixture>
        {story()}
    </Fixture>
))

storiesOf('Button', module)
    .add('with text', () => (
        <button onClick={action('clicked')}>My First Button</button>
    ))
    .add('with no text', () => (
        <button></button>
    ))

import { Fixture } from '../test/__tests__/components/helpers/Fixture'
import BaseForm from '../src/components/BaseForm'

storiesOf('BaseForm', module)
    .add('form', () => (
        <BaseForm
                actionName="action(APPROVE)"
                name="User(anonymous)"
                title="title(This is a complete custom title)"
                onAction={action('onFormAction')}
             />
    ))

import { VectorWidget } from '../src/components/VectorWidget'
import { BatmanLogo } from '../src/components/MorphLogo'

storiesOf('React Art', module)

    .add('Logo', () => (
        <VectorWidget/>
    ))
    .add('Batman', () => (
        <BatmanLogo/>
    ))
