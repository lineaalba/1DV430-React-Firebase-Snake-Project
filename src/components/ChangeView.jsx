/**
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React from 'react'
import Game from './Game'
import Highscore from './Highscore'
import Players from './Players'

/**
* Function to change view.
*/
const ChangeView = (props) => {
        if (props.value === 'menu') {
            return <div><h1 className='snake__menu'>Snake Menu</h1><br></br></div>
        } else if (props.value === 'play') {
            return <Game />
        } else if (props.value === 'highscore') {
            return <Highscore />
        } else if (props.value === 'players-online') {
            return <Players />
        }    
}
    
    export default ChangeView
