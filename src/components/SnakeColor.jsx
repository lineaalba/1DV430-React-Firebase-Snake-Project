/**
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React from 'react'
import Button from 'react-bootstrap/Button'

/**
* Function to change snake color.
*/
const SnakeColor = () => {
  const snakeDots = document.querySelectorAll('.snake__dot')
  const snakeColors = document.querySelectorAll('.snake__color')
    
 
  for (let i = 0; i < snakeColors.length; i++) {
    let color

    snakeColors[i].addEventListener('click', e => {
      switch (snakeColors[i].textContent) {
        case 'Yellow':
          color = 'yellow'
          break
        case 'Red':
          color = 'red'
          break
        case 'Green':
          color = 'rgb(11, 184, 34)'
          break
        case 'Blue':
          color = 'blue'
          break
        case 'Pink':
          color = 'rgb(252, 97, 123)'
          break
        default:
          color = 'rgb(11, 184, 34)' 
      }    
        for (let i = 0; i < snakeDots.length; i++) {
          snakeDots[i].style.background = color
        }
    })
  }
  
    return (
        <div className="dropdown">
          <Button data-testid="snakecolor" className="change__color" variant="outline-dark">Change snake color</Button>
          <div onClick={SnakeColor} className="dropdown__content">
            <p className="snake__color">Yellow</p>
            <p className="snake__color">Red</p>
            <p className="snake__color">Green</p>
            <p className="snake__color">Blue</p>
            <p className="snake__color">Pink</p>
          </div>
        </div>
    )
}

export default SnakeColor