import React from 'react';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../helpers/AuthContext';

function Navbar({click}) {
  
  const {authState,setAuthState} = useContext(AuthContext);

  let history = useHistory();
  const Logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username:"",id:0,status:false});
    history.push("/login");
  };

  return (
    <>
      <nav className='navbar'>
            <div className="nav-logo">
                <Link to='/'><h2>Image Stealer</h2></Link>
            </div>
              <div className='nav-items'>
                  <ul className='nav-links'>
                      {!authState.status  ?(
                      <>
                      <li><Link className='nav-item nav-line-hover' to="/registration">Regisztráció</Link></li>
                      <li><Link className='nav-item nav-line-hover' to="/login">Bejelentkezés</Link></li>
                      </>
                      ) : (
                        <>
                        <li><Link className='nav-item nav-line-hover' to={`/profile/${authState.id}`}>{authState.username}</Link></li>
                        <li><Link className='nav-item nav-line-hover' to="/">Főoldal</Link></li>
                        <li><Link className='nav-item nav-line-hover' to="/upload">Feltöltés</Link></li>
                        <button className='nav-btn' onClick={Logout}>Kijelentkezés</button>
                        </>
                      )}
                  </ul>
                 
                  {/*Hamburger menu*/ }
                  <div className='hamburger-menu' onClick={click}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
              </div>
      </nav>
      
    </>
  )
}

export default Navbar