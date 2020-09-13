import React from 'react'
import { render } from '@testing-library/react'
import { shallow } from 'enzyme'
import Players from '../components/Players'

describe('Tests the players component', () => {

  it('matches snapshot', () => {
    const wrapper = shallow(<Players />)
    expect(wrapper.html()).toMatchSnapshot()
  })
 
  it('renders a text if no one is playing', () => {
    const { getByText } = render(<Players/>)
    expect(getByText('There are no players online right now.')).toBeInTheDocument()
  })
})

