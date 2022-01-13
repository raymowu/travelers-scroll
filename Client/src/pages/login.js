import { useState } from "react"
import Axios from "axios";
// import logo from './logo.svg';

function LogIn() {

  const [form, setForm] = useState({ username: '', password: '' });
  
  async function login(event){
    event.preventDefault()
    Axios({
          method: "POST",
          data: {
            username: form.username,
            password: form.password,
          },
          withCredentials: true,
          url: "http://localhost:5000/login",
        }).then((res) => {

          // const data = await response.json();

          if (res.data.status === "ok"){
            alert("Login was successful");
            window.location.href = "/"
          }else{
            alert("please check your username and password");
          }

        })
  }

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}

  return (
    <div className="App">
      <form onSubmit={login}>
        <h1>Login</h1>
        <input type="text" placeholder="username" name="username" onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LogIn;
