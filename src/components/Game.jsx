/**
 * The Game component
 *
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React, { Component } from 'react'
import Snake from './Snake'
import SnakeFood from './SnakeFood'
import '../App.css'
import Button from 'react-bootstrap/Button'
import SwipeReact from 'swipe-react/lib/SwipeReact'
import firebase from '../firebase'
import SnakeColor from './SnakeColor'
import SnakeSpeed from './SnakeSpeed'
import BackgroundColor from './BackgroundColor'

/**
 * Get snake food at a random place.
 */
const randomizeFood = () => {
    const min = 1
    const max = 98
    const x = Math.floor((Math.random()*(max-min+1)+min)/2)*2
    const y = Math.floor((Math.random()*(max-min+1)+min)/2)*2
    return [x, y]
  }
  
  /**
  * Getting the right start position every new game.
  */
  const startPosition = {
    snack: randomizeFood(),
    speed: 80,
    direction: 'right',
    snakeDots: [[0, 0], [2, 0], [4, 0]]
  }

class Game extends Component {
  constructor(props){
    super(props)
    this.state = startPosition
    this.move = false
    this.nickname = ''
  }

  /**
  * Boolean to check if nickname contains possible harmful characters.
  */
  isValid = () => {
    const notValidCharacters = ['<', '>', '/', '#', '%', '&', '!', '=', '"', ';']
    for (let i = 0; i < notValidCharacters.length; i++) {
      if (this.nickname.value.includes(notValidCharacters[i])) {
        const textInfo = document.querySelector('.text-info')
        textInfo.textContent = 'Not a valid nickname!'
        return false
      } else {
        return true
      }
    }
  }

  /**
  * When player clicks start button. Checks for valid nickname.
  */
  startBtn = () => {
    const startBtn = document.querySelector('.start__btn')
    this.nickname = document.querySelector('.name')
    const textInfo = document.querySelector('.text-info')
    const changeColor = document.querySelector('.change__color')
    const changeSpeed= document.querySelector('.change__speed')
    const changeBackground = document.querySelector('.change__background')
    if (this.nickname.value.length === 0) {
      textInfo.textContent = 'Your nickname is too short!'
    } else if (this.nickname.value.length > 0 && this.isValid()) {

      changeColor.style.display = 'none'
      changeSpeed.style.display = 'none'
      changeBackground.style.display = 'none'
      startBtn.style.visibility = 'hidden'
         
      const addPlayer = firebase.firestore().collection('players').doc(this.nickname.value)

      const snake = this.state.snakeDots
      const jsonSnake = JSON.stringify(snake)

      const snakeDot0 = document.querySelector('.snake__dot')
      const snakeColor = snakeDot0.style.background

      const gameArea = document.querySelector('.game__area')
      const bgColor = gameArea.style.background

      this.move = setInterval(this.moveSnake, this.state.speed)

      const data = {
        name: this.nickname.value,
        highscore: (this.state.snakeDots.length - 3),
        food: this.state.snack,
        snake: jsonSnake,
        snakeColor: snakeColor,
        background: bgColor
      }
      addPlayer.set(data)
      
      textInfo.textContent = ''
    
      this.nickname.style.display = 'none'
      
      const nickname = document.querySelector('.nickname')
      nickname.style.display = 'grid'
          
      document.onkeydown = this.onKeyDown
    }
  }

  /**
   * Is called every time the component updates.
   */
  componentDidUpdate = () => {
    if (this.move) {
    const snake = this.state.snakeDots
    const jsonSnake = JSON.stringify(snake)

    const snakeDot = document.querySelector('.snake__dot')
    const snakeColor = snakeDot.style.background

    firebase.firestore().collection('players').doc(this.nickname.value)
    .update({
        highscore: (this.state.snakeDots.length - 3),
        food: this.state.snack,
        snake: jsonSnake,
        snakeColor: snakeColor
      })

    this.swipe()
    this.crashWall()
    this.crashItSelves()
    this.snakeEat()
    this.checkColor()
    }
  }

  /**
   * Make sure the snake color is correct when snake grows.
   */
  checkColor = () => {
    const snakeDot0 = document.querySelector('.snake__dot')
    const snakeColor = snakeDot0.style.background

    const snakeDots = document.querySelectorAll('.snake__dot')

    for (let i = 0; i < snakeDots.length; i++) {
      snakeDots[i].style.background = snakeColor
    }
  }

  /**
   * Make sure snake is moving by the keys chosen direction.
   */
  onKeyDown = (e) => {
    const dir = this.state.direction
    e = e || window.event
    e.preventDefault()

    if (e.keyCode === 38 && dir !== 'down') {
      this.setState({direction: 'up'})
    } else if (e.keyCode === 40 && dir !== 'up') {
      this.setState({direction: 'down'})
    } else if (e.keyCode === 37 && dir !== 'right') {
      this.setState({direction: 'left'})
    } else if (e.keyCode === 39 && dir !== 'left') {
      this.setState({direction: 'right'})
    }
  }

  /**
   * Function to be able to play with touch instead of keys.
   */
  swipe = () => {
    SwipeReact.config({
      left: () => {
        if (this.state.direction !== 'right') {
          this.setState({direction: 'left'})
        }
      },
      right: () => {
        if (this.state.direction !== 'left') {
          this.setState({direction: 'right'})
        }
      },
      up: () => {
        if (this.state.direction !== 'down') {
          this.setState({direction: 'up'})
        }
      },
      down: () => {
        if (this.state.direction !== 'up') {
          this.setState({direction: 'down'})
        }
      }
    })
  }
  
  /**
   * Creates an illution of the snake moving.
   */
  moveSnake = () => {
    const dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]

    const dir = this.state.direction

    if (dir === 'right') {
      head = [head[0] + 2, head[1]]
    } else if (dir === 'left') {
      head = [head[0] - 2, head[1]]
    } else if (dir === 'down') {
      head = [head[0], head[1] + 2]
    } else if (dir === 'up') {
      head = [head[0], head[1] - 2]
    }
    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots
    })
  }

  /**
   * Creates an illution of that the snake is eating.
   */
  snakeEat = () => {
    const head = this.state.snakeDots[this.state.snakeDots.length - 1]
    const snack = this.state.snack

    if (head[0] === snack[0] && head[1] === snack[1]) {
      this.setState({
        snack: randomizeFood(),
        snakeDots: this.growSnake()
      })
      this.increaseSpeed()
    }
  }
    
  /**
   * Checks if the snake crashes a wall.
   */
  crashWall = () => {
    const head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver()
    }
  }
  
  /**
   * Checks if the snake crashes itself.
   */
  crashItSelves = () => {
    const snake = [...this.state.snakeDots]
    const head = snake[snake.length - 1]
    snake.pop()
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver()
      }
    })
  }
  
  /**
  * Creates a bigger snake.
  */
  growSnake = () => {
    const newSnake = [...this.state.snakeDots]
    newSnake.unshift([])

    return newSnake
  }
  
  /**
  * Function to increase speed every time the snake eats a snack.
  */
  increaseSpeed = () => {
      clearInterval(this.move)
      
      this.setState({
        speed: (this.state.speed - 1)
      })
      this.move = setInterval(this.moveSnake, this.state.speed)
    }

/**
 * Deletes document in firebase and resets buttons.
 */
  gameOver = () => {
    firebase.firestore().collection('players').doc(this.nickname.value).delete()
      
    firebase
      .firestore()
      .collection('scores')
      .add({
       name: this.nickname.value,
       highscore: (this.state.snakeDots.length - 3)
      })

    const textInfo = document.querySelector('.text-info')
    textInfo.textContent = 'Game Over! Your score is ' + (this.state.snakeDots.length - 3)
    clearInterval(this.move)
    this.move = false
    this.setState(startPosition)

    const startBtn = document.querySelector('.start__btn')
    startBtn.style.visibility = 'visible'

    const changeColor= document.querySelector('.change__color')
    const changeSpeed = document.querySelector('.change__speed')
    const changeBackground = document.querySelector('.change__background')
    changeColor.style.display = 'grid'
    changeSpeed.style.display = 'grid'
    changeBackground.style.display = 'grid'
  }

/**
 * Gets data from SnakeSpeed component.
 */
  dataFromSpeedComponent = (data) => {
    this.state.speed = data
    const levelParagraph = document.querySelector('.level')
    levelParagraph.style.background = '#161915'

    let level
    if (data === 120) {
      level = 'Easy'
      levelParagraph.style.color = '#3eee09'
    } else if (data === 80) {
      level = 'Moderate'
      levelParagraph.style.color = 'yellow'
    } else if (data === 60) {
      level = 'Hard'
      levelParagraph.style.color = 'rgb(255, 144, 40)'
    } else if (data === 40) {
      level = 'Insane'
      levelParagraph.style.color = 'red'
    }
  
    levelParagraph.textContent = 'Level: ' + level
  }

  render () {
    return (
      <div className="App">
        <br></br>
        <input type="text" className="name" placeholder="Your nickname"></input>
        <Button data-testid="startbutton" onClick={this.startBtn} className="start__btn" style={{visibility: 'visible'}} variant="outline-dark">Play!</Button>
        <SnakeColor data-testid="snakecolor" />
        <SnakeSpeed data-testid="snakespeed" speed={this.dataFromSpeedComponent}/>
        <BackgroundColor data-testid="backgroundcolor"/>
        <hr />
        <p className="text-info"></p>
        <p data-testid="level" className="level">Level: Easy</p>
        <p className="nickname">Nickname: {this.nickname.value}</p>
        <p className="score">Score: {this.state.snakeDots.length - 3}</p>
        <div data-testid="gamearea" {...SwipeReact.events} tabIndex="1" className="game__area">
          <Snake snakeDots={this.state.snakeDots}/>
          <SnakeFood dot={this.state.snack}/>
        </div>
      </div>
    )
  }
}

export default Game
