import { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/profile.css";
import ProfileHeader from "../components/ProfileHeader";
import BuildCard from "../components/BuildCard";
import UserBuildCard from "../components/UserBuildCard";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    likedBuilds: [],
    createdBuilds: [],
    date: "",
    __v: 0,
  });
  const [logged, setLogged] = useState({});

  const userData = () => {
    Axios.get(`http://localhost:5000/profile/${id}`).then((response) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnDelete = (e) => {
    e.preventDefault();
    //DELETE FUNCTIONALITY HERE
  };


  return (
    <Layout Auth={false}>
      <ProfileHeader user={user} />
      <div className="profile-container">
        <div className="liked-builds-container">
          {user.likedBuilds.length > 0 && <h1> {user.username}'s Liked Builds</h1>}
          <div className="profile-break"></div>

          {user.likedBuilds &&
            user.likedBuilds
              .slice(0)
              .reverse()
              .map((build) => {
                return (
                  <>
                    <BuildCard key={build._id} build={build} />
                    <div className="profile-break"></div>
                  </>
                );
              })}
        </div>

        <div className="created-builds-container">
          {user.createdBuilds.length > 0 && <h1> {user.username}'s Builds</h1>}
          <div className="profile-break"></div>
          {user.createdBuilds &&
            user.createdBuilds
              .slice(0)
              .reverse()
              .map((build) => {
                return (
                  <>
                    <UserBuildCard
                      key={build._id}
                      build={build}
                      handleOnDelete={handleOnDelete}
                    />
                    <div className="profile-break"></div>
                  </>
                );
              })}
        </div>
        <div className="break"></div>
        {logged.username === user.username ? (
          <button onClick={Logout}>Log Out</button>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
}

export default Profile;
