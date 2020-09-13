/**
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React from 'react'
import Button from 'react-bootstrap/Button'

/**
* Function to change background color of game area.
*/
const BackgroundColor = () => {
    const gameArea = document.querySelector('.game__area')
    const bgColor = document.querySelectorAll('.bg__color')

    for (let i = 0; i < bgColor.length; i++) {
        let color
        bgColor[i].addEventListener('click', e => {

            switch (bgColor[i].textContent) {
                case 'Black':
                    color = '#151719'
                    break
                case 'White':
                    color = 'white'
                    break
                case 'Grey':
                    color = 'grey'
                    break
                default:
                    color = '#151719'
            }

            gameArea.style.background = color 
        })
    }
 
    return (
        <div className="dropdown">
            <Button data-testid="backgroundcolor" className="change__background" variant="outline-dark">Change background</Button>
            <div onClick={BackgroundColor} className="dropdown__content">
                <p data-testid="black" className="bg__color">Black</p>
                <p data-testid="white" className="bg__color">White</p>
                <p data-testid="grey" className="bg__color">Grey</p>
            </div>
        </div> 
    )
}

export default BackgroundColor
