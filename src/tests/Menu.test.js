import React from 'react'
import { shallow } from 'enzyme'
import Menu from '../components/Menu'

describe('Tests the Menu component', () => {

  it('matches snapshot', () => {
    const wrapper = shallow(<Menu />)
    expect(wrapper.html()).toMatchSnapshot()
  })
})

