import React from 'react'
import { shallow } from 'enzyme'
import BackgroundColor from '../components/BackgroundColor'

describe('Tests the BackgroundColor component', () => {

  it('matches snapshot', () => {
    const wrapper = shallow(<BackgroundColor />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
