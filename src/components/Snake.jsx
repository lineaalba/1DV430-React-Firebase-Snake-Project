/**
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React from 'react'

/**
* Creates snake dots.
*/
const Snake = (props) => {
    return (
        <div data-testid="snakedots">
            {props.snakeDots.map((dot, i) => {
                const styles = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`
                }
                return (  
                    <div className="snake__dot" key={i} style={styles}></div>
                )
            })}
        </div>
    )
}

export default Snake