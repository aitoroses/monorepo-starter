import OriginalPlayground from 'component-playground'
import scope from '../scope'
import * as React from 'react'

export const Playground = ({code}) => (
    <OriginalPlayground
      codeText={code}
      scope={scope} />
)
