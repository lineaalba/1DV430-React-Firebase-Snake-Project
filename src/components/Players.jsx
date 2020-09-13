/**
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React, { useState, useEffect } from 'react'
import firebase from '../firebase'

/**
* Gets relevant data from firestore, order by highest score.
* @returns {array}
*/
const OnlinePlayers = () => {
    const [players, setPlayers] = useState([])
    useEffect(() => { 
        firebase
            .firestore()
            .collection('players')
            .orderBy('highscore', 'desc')
            .onSnapshot((snapshot) => {
                const newPlayer = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setPlayers(newPlayer)
            })
    }, [])
    return players
}

/**
* Presents online player name, score and game area.
*/
const Players = () => {
    const players = OnlinePlayers()

        if (players.length > 0) {
            return (
                <div>
                    <ol>
                        {players.map(player => (
                            <li className="players__list" key={player.id}>
                                <h3>{player.name} | Score: {player.highscore}</h3>
                                <div className="game__area" style={{background: `${player.background}`}}>
                                    <div className="snake__food" style={{left: `${player.food[0]}%`, top: `${player.food[1]}%`}}></div>
                                    <div>
                                        {
                                            JSON.parse(player.snake).map((dot, i) => {
                                                const styles = {
                                                        left: `${dot[0]}%`,
                                                        top: `${dot[1]}%`,
                                                        background: `${player.snakeColor}`
                                                }
                                                return (  
                                                    <div className="snake__dot" key={i} style={styles}></div>        
                                                )
                                    
                                               
                                        })}
                                        
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            )
        } else {
            return (
                <div>
                <br></br>
                    <h4>There are no players online right now.</h4>
                <br></br>
                </div>
            )
        }
    }

export default Players
