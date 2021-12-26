import react, { useState } from "react"

import classes from "../../css/navbar.module.css"

function Header(){
    return(
        <header>
            <div className={classes.logo}>
                <h2><a href="#">Genshin App</a></h2>
            </div>
            <div>
                <ul className={classes.items}>
                    <li><a href="#">Builds</a></li>
                    <li><a href="#">Log In</a></li>
                    <li><a href="#" className={classes.signup}>sign Up</a></li>
                </ul>
            </div>
        </header>
    )
}

export default Header