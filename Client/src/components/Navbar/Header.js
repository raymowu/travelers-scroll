import { useState } from "react"
import React from "react"

import classes from "../../css/navbar.module.css"

// class Avatar extends React.Component {

// }



function Header({user}){

    const [drop, setDrop] = useState(false); 
    

    const links = [
        {id: 0, name: "New Post", link: "/blog/new", className:`${classes.link}`},
        {id: 1, name: "Log In", link: "/login", className:`${classes.link}`},
        {id: 2, name: "Sign Up", link: "/register", className:`${classes.signup}`}
    ]
    const userlink = [
        {id: 0, name: user.username, link: `/profile/${user.id}`, className:``}
    ]
    const dropLink = [
        {id: 0, name: "Home"},
        {id: 1, name: "About"},
        {id: 2, name: "Content"}
    ];

    const dropMenu = () =>{
        setDrop(!drop)
        console.log(drop)
    }



    return(
        <header>
            <div className={classes.logo}>
                <h2><a href="/">Blog App</a></h2>
            </div>
            <div>
            <ul className={`${classes.items}`}>
                <li><a href="/blog/new" className={classes.link}>Builds</a></li>
                    {user.id ? 
                        <>
                            <li>
                                <a href={`/profile/${user.username}`} className={classes.link}>{user.username}</a>
                            </li>
                        </>
                         : 
                         <>
                            <li><a href="/login" className={classes.link}>Login</a></li>
                            <li><a href="/register" className={classes.signup}>Sign Up</a></li>
                         </>
                    
                    }
                </ul>
            </div>
        </header>
    )
}

export default Header