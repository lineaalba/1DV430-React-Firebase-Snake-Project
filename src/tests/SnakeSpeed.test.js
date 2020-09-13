import React from 'react'
import { shallow } from 'enzyme'
import SnakeSpeed from '../components/SnakeSpeed'

describe('Tests the SnakeSpeed component', () => {

  it('matches snapshot', () => {
    const wrapper = shallow(<SnakeSpeed />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
  