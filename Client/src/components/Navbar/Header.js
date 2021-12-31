// import { useState } from "react"

import classes from "../../css/navbar.module.css"


function Header(user){
    const links = [
        {id: 0, name: "Builds", link: "#", className:`${classes.link}`},
        {id: 1, name: "Log In", link: "#", className:`${classes.link}`},
        {id: 2, name: "Sign Up", link: "#", className:`${classes.signup}`}
    ]
    
    if(!user){
        console.log("no user logged in")
    }
    else{
        console.log("there is a user logged in")
    }

    function checkUser() {
        if(!user){
            return(
                <ul>
                    {links.map(a => {
                        return(
                            <li key={a.id}><a href={a.link} className={`${a.className}`}>{a.name}</a></li>
                            
                            
                        )
                        
                        //     
                        
                        // console.log(`<li key=${a.id}><a href=${a.link} className=${a.className}>${a.name}</a></li>`)
                        
                    })}
                </ul>
                
            )
        }
        else{
            return(
                <div>
                    <li><a href="#" className={`${classes.link}`}>Blog</a></li>
                    <li><a href={`/profile/${user.id}`}>{user.username}</a></li>
                </div>
                
            )
        }
    }

    return(
        <header>
            <div className={classes.logo}>
                <h2><a href="#">Genshin App</a></h2>
            </div>
            <div>
                {checkUser}
            </div>
        </header>
    )
}

export default Header