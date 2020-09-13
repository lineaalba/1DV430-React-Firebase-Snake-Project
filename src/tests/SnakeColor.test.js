import React from 'react'
import { shallow } from 'enzyme'
import SnakeColor from '../components/SnakeColor'

describe('Tests the SnakeColor component', () => {

  it('matches snapshot', () => {
    const wrapper = shallow(<SnakeColor />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})