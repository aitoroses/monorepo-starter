import * as React from 'react';

import { storiesOf, action, linkTo } from '@kadira/storybook';
import { Playground } from './components/Base'

const helloComponentExample = require('raw!./examples/HelloComponent.txt')

storiesOf('@application/core', module)
.add('test', () => (
  <Playground
    code={helloComponentExample}/>
))
