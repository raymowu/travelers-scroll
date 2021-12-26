import react, { useState } from "react"

import classes from "../../css/navbar.module.css"

function Header(){
    return(
        <header>
            <div className={classes.logo}>
                <h2>Genshin App</h2>
            </div>
            <div>
                <ul className={classes.items}>
                    <li>Builds</li>
                    <li>Log In</li>
                    <li>sign Up</li>
                </ul>
            </div>
        </header>
    )
}

export default Header