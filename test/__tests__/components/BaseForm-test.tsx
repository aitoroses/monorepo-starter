import * as React from 'react'
import {mount, render, shallow} from 'enzyme'
import {expect} from 'chai'
import {spy} from 'sinon'

// Explore this API
// https://github.com/producthunt/chai-enzyme

import { FixtureDecorator } from './helpers/Fixture'
import BaseForm from '../../../src/components/BaseForm'
import FlatButton from 'material-ui/FlatButton'

@FixtureDecorator
class FormTestComponent extends React.Component<any, any> {

    render() {
        return <BaseForm
                actionName="APPROVE"
                name="anonymous"
                title="my-title"
                {...this.props}
             />
    }
}

describe('Components: BaseForm', () => {
    it('should be renderable', () => {
        const wrapper = mount(<FormTestComponent/>)

        expect(wrapper).to.not.have.text("Form has been correctly submitted")
        expect(wrapper).to.have.text().match(/anonymous/)
        expect(wrapper).to.have.text().match(/APPROVE/)
    })

    it('should be show as hidden too', () => {
        const wrapper = mount(<FormTestComponent hidden={true}/>)

        expect(wrapper).to.have.text("Form has been correctly submitted.")
        expect(wrapper).to.not.have.text().match(/anonymous/)
        expect(wrapper).to.not.have.text().match(/APPROVE/)
    })

    it('should respond to click', () => {
        const actionHandler = spy()
        const wrapper = mount(<FormTestComponent onAction={actionHandler} />)

        wrapper.find(FlatButton).simulate('click')
        expect(actionHandler).to.have.property('callCount', 1);
    })
})
