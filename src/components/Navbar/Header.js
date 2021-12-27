import react, { useState } from "react"

import classes from "../../css/navbar.module.css"


function Header(){
    const [links, setLinks] = useState([
        {id: 0, name: "Builds", link: "#", className:`${classes.link}`},
        {id: 1, name: "Log In", link: "#", className:`${classes.link}`},
        {id: 2, name: "Sign Up", link: "#", className:`${classes.signup}`}
    ])
    let activeLink = -1
    const handleClick = (e) =>{
        if(e.id != 2){
            activeLink = e.id
        }
        // console.log(e)
    }
    const handleClass = (e) =>{
        if (e.id === activeLink){
            return (
                e.className + classes.active
            )
        }
        else{
            return e.className
        }
    }
    return(
        <header>
            <div className={classes.logo}>
                <h2><a href="#">Genshin App</a></h2>
            </div>
            <div>
                <ul className={classes.items}>
                    {/* <li><a href="#" className={classes.link, classes.active}>Builds</a></li>
                    <li><a href="#" className={classes.link}>Log In</a></li>
                    <li><a href="#" className={classes.signup}>sign Up</a></li> */}
                    {links.map(a => {
                        return(
                            <li key={a.id} onClick={() => handleClick(a)}><a href={a.link} className={`${a.className}`}>{a.name}</a></li>
                            
                            
                        )
                        
                        //     
                        
                        // console.log(`<li key=${a.id}><a href=${a.link} className=${a.className}>${a.name}</a></li>`)
                        
                    })}
                </ul>
            </div>
        </header>
    )
}

export default Header