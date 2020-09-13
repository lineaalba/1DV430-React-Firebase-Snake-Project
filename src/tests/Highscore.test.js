import React from 'react'
import { shallow } from 'enzyme'
import Highscore from '../components/Highscore'

  describe('To test Highscore component', () => {

    it('matches snapshot', () => {
      const wrapper = shallow(<Highscore />)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
