import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/home"
import SignUp from "./pages/signup"
import LogIn from ".//pages/login"
import Profile from "./pages/profile"
import Character from "./pages/Character"


const App = () => {
	return (
		<div>
            
			
            <BrowserRouter>
                    <Routes>
                        <Route path="/" exact element={ <Home />  } />
                        <Route path="/register" exact element={ <SignUp /> } />
                        <Route path="/login" exact element={ <LogIn /> } />
                        <Route path="profile/:id" exact element={<Profile />} />
                        <Route path="/characters/:characterName" exact element ={ <Character />} />
                    </Routes>
                
            </BrowserRouter>
		</div>
	)
}

export default App