import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';
import {useState,useContext} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  let history = useHistory();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const { setAuthState } = useContext(AuthContext);

    const Login = () => {
        const data = {username:username,password:password};
        axios.post("http://localhost:3001/users/login",data).then((response)=>{
            if (response.data.error) {
                alert(response.data.error);
              } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                username: response.data.username,
                id: response.data.id,
                status: true
              });
                history.push("/");
                window.location.reload();
              }
        });
    };

  return (
    <div>
        <section>
        <div className='login-container'>
        <div className="img-box">
        <img src='./image/img8.jpg' alt='Kép'/>
        </div>
        <div className="content-box">
            <div className='form-box'>
                <h2>Bejelentkezés</h2>
                <form>
                    <div className='input-box'>
                        <span>Felhasználónév:</span>
                        <input type='text' onChange={(event) =>{
                            setUsername(event.target.value);
                        }} />
                    </div>
                    <div className='input-box'>
                        <span>Jelszó</span>
                    <input type='password' onChange={(event)=>{
                        setPassword(event.target.value);
                    }}/>
                    </div>
                    <div className='input-box'>
                    <button className='login-btn' onClick={Login}>Bejelentkezés</button>
                    </div>
                    <div className='input-box'>
                    <p className=''>Még nem regisztráltál ? <Link to="/registration">Regisztráció</Link></p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </section>
    </div>
  )
}

export default Login