/**
 * The Menu component
 *
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import ChangeView from './ChangeView'

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: 'menu',
        }        
    }

    /**
    * If the player clicks "Start Game"-button.
    */
    handleClickPlay = () => {
        const startGame = document.querySelector('.btn__0')
        const playersOnline = document.querySelector('.btn__1')
        const highscore = document.querySelector('.btn__3')

        if (this.state.value === 'menu') {
            this.setState({
                value: 'play'
            })
            startGame.textContent = 'Return to menu'
            playersOnline.style.display = 'none'
            highscore.style.display = 'none'
        } else if (this.state.value === 'play') {
            this.setState({
                value: 'menu'
            })
            startGame.textContent = 'Start Game'
            playersOnline.style.display = 'grid'
            highscore.style.display = 'grid'
        }
    }


    /**
    * If the player clicks "Players online"-button.
    */
    handleClickplayersOnline = () => {
        const startGame = document.querySelector('.btn__0')
        const playersOnline = document.querySelector('.btn__1')
        const highscore = document.querySelector('.btn__3')

        if (this.state.value === 'menu') {
            this.setState({
                value: 'players-online'
            })
            startGame.style.display = 'none'
            playersOnline.textContent = 'Return to menu'
            highscore.style.display = 'none'
        } else if (this.state.value === 'players-online') {
            this.setState({
                value: 'menu'
            });
            startGame.style.display = 'grid'
            playersOnline.textContent = 'Players online'
            highscore.style.display = 'grid'
        }
    }

    /**
    * If the player clicks "Highscore"-button.
    */
    handleClickHighscore = () => {
        const startGame = document.querySelector('.btn__0')
        const playersOnline = document.querySelector('.btn__1')
        const highscore = document.querySelector('.btn__3')

        if (this.state.value === 'menu') {
            this.setState({
                value: 'highscore'
            })
            startGame.style.display = 'none'
            playersOnline.style.display = 'none'
            highscore.textContent = 'Return to menu'
        } else if (this.state.value === 'highscore') {
            this.setState({
                value: 'menu'
            })
            startGame.style.display = 'grid'
            playersOnline.style.display = 'grid'
            highscore.textContent = 'Highscore'
        }
    }

    render() {
      return (
          <div className="menu__btns">
            <ChangeView value={this.state.value} />
            <Button data-testid="play" onClick={this.handleClickPlay} className="btn__0" variant="outline-dark">Start Game</Button>
          <br></br>
            <Button data-testid="players" onClick={this.handleClickplayersOnline} className="btn__1" variant="outline-dark">Players online</Button>
          <br></br>
            <Button data-testid="highscore" onClick={this.handleClickHighscore} className="btn__3" variant="outline-dark">Highscore</Button>
          </div>
      )
    }
}

export default Menu
