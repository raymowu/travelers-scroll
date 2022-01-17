import { useState, useEffect } from "react"
import Axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout"

function Profile() {

    const {id} = useParams();
    const [modifier, setModifier] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() =>{
        Axios.get(`http://localhost:5000/profile/${id}`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          // console.log(response.data.blogs)
          if (response.data.status === "ok"){
              setUser(response.data.user);
              if(response.data.modifier){
                  setModifier(true);
              }
          }
          else{
              alert(response.data.message)
          }
        });
      }, []);

      const Logout = () => {
        Axios.get(`http://localhost:5000/logout`, {withCredentials: true}).then((response) => {
          console.log(response.data)
          // console.log(response.data.blogs)
          if (response.data.status === "ok"){
            alert("Logout was successful");
          }
          else{
              alert(response.data.message)
          }
        });
      }
    return(
        <Layout Auth={false}>
            <div>
                <h1>profile page for {user.username}</h1>
            </div>
            {modifier 
            ?
            <>
            <div>edit, delete</div> 
            <button onClick={Logout}><a href="/">Logout</a></button>
            </>
            
            :
            <></>
            }
        </Layout>
        
    )
}

export default Profile;
