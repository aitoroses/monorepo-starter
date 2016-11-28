import * as React from 'react'
import { render } from 'react-dom'
import { VectorWidget } from '../../src/components/VectorWidget'
import { BatmanLogo } from '../../src/components/MorphLogo'
import { mount } from 'enzyme'

describe('React Art:', () => {

    it('VectorWidget', () => {
        // render(<VectorWidget />, document.body);
        mount(<VectorWidget />);
    })

    it('MorphLogo', () => {
        // render(<BatmanLogo />, document.body);
        mount(<BatmanLogo />);
    })
})
