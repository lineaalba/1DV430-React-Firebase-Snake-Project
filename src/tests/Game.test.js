import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { mount } from 'enzyme'
import Game from '../components/Game'

describe('Tests the Game component', () => {

  it('renders correctly', () => {
    const { queryByTestId, queryByPlaceholderText } = render(<Game />)
    expect(queryByPlaceholderText('Your nickname')).toBeTruthy()
    expect(queryByTestId('startbutton')).toBeTruthy()
    expect(queryByTestId('snakecolor')).toBeTruthy()
    expect(queryByTestId('snakespeed')).toBeTruthy()
    expect(queryByTestId('backgroundcolor')).toBeTruthy()
    expect(queryByTestId('gamearea')).toBeTruthy()
  })

  it('contains 1 input field and 4 buttons', () => {
    const wrapped = mount(<Game />)
    expect(wrapped.find('input').length).toEqual(1)
    expect(wrapped.find('button').length).toEqual(4)
  })

  test('that all four buttons and the input field is not visible and level is visible when "Play!"-button is clicked', async () => {
    const clickedBtnMock = jest.fn()
    const { queryByPlaceholderText, queryByTestId } = render(<Game onButtonClick={clickedBtnMock}/>)
    const nickname = queryByPlaceholderText('Your nickname')
    nickname.value = 'test'
    const snakeColor = queryByTestId('snakecolor')
    const snakeSpeed = queryByTestId('snakespeed')
    const backgroundColor = queryByTestId('backgroundcolor')
    const level = queryByTestId('level')
    const startBtn = queryByTestId('startbutton')
    fireEvent.click(startBtn)
    expect(await startBtn).not.toBeVisible()
    expect(await nickname).not.toBeVisible()
    expect(await snakeColor).not.toBeVisible()
    expect(await snakeSpeed).not.toBeVisible()
    expect(await backgroundColor).not.toBeVisible()
    expect(await level).toBeVisible()
 })
})