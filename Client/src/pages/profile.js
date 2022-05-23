import { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/profile.css";
import ProfileHeader from "../components/ProfileHeader";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState({});

  const userData = () => {
    Axios.get(`http://localhost:5000/profile/${id}`).then((response) => {
      console.log(response.data);
      // console.log(response.data.blogs)
      if (response.data.status === "ok") {
        setUser(response.data.user);
      } else {
        alert(response.data.message);
      }
    });
  };
  const GetUser = () => {
    Axios.get("http://localhost:5000/current-user", { withCredentials: true }).then(
      (response) => {
        if (response.data.status === "ok") {
          setLogged(response.data.user);
        }
      }
    );
  };
  const Logout = () => {
    Axios.get("http://localhost:5000/logout", { withCredentials: true }).then((res) => {
      if (res.data.status === "ok") {
        alert("Successfully logged out");
        window.location.href = "/";
      } else {
        alert("something went wrong");
      }
    });
  };

  useEffect(() => {
    userData();
    GetUser();
  }, []);
  return (
    <Layout>
      <ProfileHeader user={user} />
      <div className="profile-container">
        <h1>profile page for {user.username}</h1>
        <div className="break"></div>
        {logged.username === user.username ? (
          <button onClick={Logout}>Log Out</button>
        ) : (
          <h1>doesnt work</h1>
        )}
      </div>
    </Layout>
  );
}

export default Profile;
