/**
 * The SnakeSpeed component.
 * 
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React from 'react'
import Button from 'react-bootstrap/Button'

class SnakeSpeed extends React.Component {

    /**
    * Callback to send data with by the player chosen speed.
    * @returns chosen level.
    */
    sendData = () => {
        const speed = document.querySelectorAll('.speed')

        for (let i = 0; i < speed.length; i++) {
            let level
            speed[i].addEventListener('click', e => {
                switch (speed[i].textContent) {
                    case 'Easy':
                        level = 120
                        break
                    case 'Moderate':
                        level = 80
                        break
                    case 'Hard':
                        level = 60
                        break
                    case 'Insane':
                        level = 40
                        break
                    default:
                        level = 120
                }
                return this.props.speed(level)
            })
        }
    }
    
    render() {
        return (
            <div className="dropdown">
                <Button data-testid="snakespeed" className="change__speed" variant="outline-dark">Change speed</Button>
                <div className="dropdown__content">
                    <p onClick={this.sendData} className="speed">Easy</p>
                    <p onClick={this.sendData} className="speed">Moderate</p>
                    <p onClick={this.sendData} className="speed">Hard</p>
                    <p onClick={this.sendData} className="speed">Insane</p>
                </div>
            </div>
        )
    }
}

export default SnakeSpeed