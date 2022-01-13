import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"

function SignUp() {

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  
  async function register(event){
    event.preventDefault()
    Axios({
      method: "POST",
      data: {
        username: form.username,
        email: form.email,
        password: form.password,
      },
      withCredentials: true,
      url: "http://localhost:5000/register",
    }).then((res) => {
      // const data = await response.json();

      if (res.data.status === "ok"){
        alert("Account has been successfully created!")
        window.location.href = "/"
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
      <form onSubmit={register}>
        <h1>Create Account</h1>
        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
