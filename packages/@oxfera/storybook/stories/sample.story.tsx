import * as React from 'react';

import { storiesOf, action, linkTo } from '@kadira/storybook';
import { css } from 'glamor'


import { HelloComponent } from '@oxfera/core/src/app/hello/components/HelloComponent'
import Playground from 'component-playground'

const scope = {
    React,
    HelloComponent
}


const codeExample = `
    <HelloComponent message='Hello Daniel' />
`

  storiesOf('@application/core', module)
    .add('test', () => (
      <Playground
        codeText={codeExample}
        scope={scope} />
    ))
