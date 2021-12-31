import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"

function SignUp() {

  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [pass, setPass] = useState("")

  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const history = useNavigate()

  // async function submit(event){
  //   event.preventDefault()
  //   const response = await fetch("http://localhost:5000/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(form)
  //   });

  //   const data = await response.json();

  //   if (data.status === "ok"){
  //     window.location.href = "/"
  // }
  // }
  const register = () => {
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
      if (res.data.status === "ok"){
          window.location.assign(`http://localhost:3000/profile/${res.data.user.id}`)
          alert("Accout successfully created")
      }
      else{
        alert(res.data.message)
      }
    });
    // console.log(form)
  };

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
