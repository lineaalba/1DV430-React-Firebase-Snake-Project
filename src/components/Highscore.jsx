/**
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React, {useState, useEffect} from 'react'
import firebase from '../firebase'

/**
* Gets relevant data from firestore, order by highest score.
* @returns {array}
*/
function useScore() {
    const [savedScores, setScores] = useState([])
    useEffect(() => {
        firebase
            .firestore()
            .collection('scores')
            .where('highscore', '>', 0)
            .orderBy('highscore', 'desc').limit(10)
            .onSnapshot((snapshot) => {
                const newScores = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setScores(newScores)
            })
    }, [])

    return savedScores
    }

    /**
    * Presents player name and highscore.
    */
    const Highscore = () => {
        const hs = useScore()

        return (
        <div>
            <h2>Highscore List</h2>
            <ul>
                {hs.map((scores) =>
                <li data-testid="highscorelist" className="highscore__list" key={scores.id}>
                    <div>
                        <hr/>
                        <h4 className="player">Player </h4>
                        <h4 className="player__name"> {scores.name}</h4>
                    </div>
                    <div>
                        <h4 className="score_">Score </h4>
                        <h4 className="score__value"> {scores.highscore}</h4>
                        <hr/>
                    </div>
                </li> 
                )}
            </ul>
        </div>
        )
    }

export default Highscore
