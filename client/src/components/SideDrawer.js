import '../css/SideDrawer.css';
import {Link} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import {useContext} from 'react';
import {useHistory} from 'react-router-dom';

function SideDrawer({show,click}) {
  const sideDrawerClass = ["sidedrawer"];
  const {authState,setAuthState} = useContext(AuthContext);

  let history = useHistory();
  const Logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username:"",id:0,status:false});
    history.push("/login");
  };

  if(show)
  {
    sideDrawerClass.push("show");
  }
  return (
     <div className={sideDrawerClass.join(" ")}>
        <ul className='sidedrawer-links' onClick={click}>
        {!authState.status  ? (
          <>
          <li><Link className='sidedrawer-item' to="/registration">Regisztráció</Link></li>
          <li><Link className='sidedrawer-item' to="/login">Bejelentkezés</Link></li>
          </>
          ):(
          <>
          <li><Link className='sidedrawer-item' to="/profile">{authState.username}</Link></li>
          <li><Link className='sidedrawer-item' to="/">Főoldal</Link></li>
          <li><Link className='sidedrawer-item' to="/upload">Feltöltés</Link></li>
          <li className='sidedrawer-item' onClick={Logout}>Kijelentkezés</li>
          </>
          )}
        </ul>  
     </div>
  )
}

export default SideDrawer