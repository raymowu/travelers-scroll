import { useState } from "react"
import Axios from "axios";
// import logo from './logo.svg';

function LogIn() {

  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [pass, setPass] = useState("")

  const [form, setForm] = useState({ username: '', password: '' });

  // async function submit(event){
  //   event.preventDefault()
  //   const response = await fetch("http://localhost:5000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(form)
  //   })

    

  //   const data = await response.json();

  //   if (data.status === "ok" && data.user){
  //     alert(`Login was successful. Welcome ${data.user.username}`);
  //     window.location.href = "/"
  //   }else{
  //     alert("please check your username and password");
  //   }
  // }

  
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: form.username,
        password: form.password,
      },
      withCredentials: true,
      url: "http://localhost:5000/login",
    }).then((res) => {
      if (res.data.status === "ok"){
        window.location.assign("http://localhost:3000/")
        alert(res.data.message)
    }
    else{
      alert(res.data.message)
    }
    });
  };

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
