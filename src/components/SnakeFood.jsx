/**
 * @author Filippa Jakobsson
 * @version 1.0
 */

import React from 'react'

/**
* Creates snake food.
*/
const Food = (props) => {

    const styles = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }

    return (
        <div data-testid="snakefood" className="snake__food" style={styles}></div>
    )
}

export default Food