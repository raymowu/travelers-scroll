import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/home"
import SignUp from "./pages/signup"
import LogIn from ".//pages/login"
import Layout from "./components/Layout"


const App = () => {
	return (
		<div>
            
			
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" exact element={ <Home />  } />
                        <Route path="/register" exact element={ <SignUp /> } />
                        <Route path="/login" exact element={ <LogIn /> } />
                    </Routes>
                </Layout>
                
            </BrowserRouter>
		</div>
	)
}

export default App