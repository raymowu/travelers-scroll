import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "../css/form.css";

function ForgotPassword() {
  const [form, setForm] = useState({ password: "", cpassword: "" });
  const { id } = useParams();

  async function ChangePassword(event) {
      alert("button was clicked");
    if(form.password === form.cpassword){
        alert("passwords match")
        event.preventDefault();
        Axios({
        method: "POST",
        data: {
            password: form.password,
        },
        withCredentials: true,
        url: `http://localhost:5000/resetpassword/${id}`,
        }).then((res) => {
        if (res.data.status === "ok") {
            alert("password was reset");
            window.location.href = "/login";
        } else {
            alert("there was an error");
        }
        });  
    }
    else{
        alert("Passwords dont mathc");
    }
    
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="app">
      <form onSubmit={ChangePassword} className="form-container">
        <h1>Reset Password</h1>
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="cpassword"
          className="input"
          onChange={handleChange}
        />
        <br />
        <button type="submit" className="button-form">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
