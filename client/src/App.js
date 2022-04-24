import { useState,useEffect,useContext } from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';
import Profile from './Pages/Profile';
import Post from './Pages/Post';
import Upload from './Pages/Upload';
import ChangesPassword from './Pages/ChangesPassword';
import PageNotFound from './Pages/PageNotFound';
import axios from 'axios';
import {AuthContext} from './helpers/AuthContext';

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const [sideToggle,setSideToggle] = useState(false);
  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
        <Navbar click={() => setSideToggle(true)}/>
        <SideDrawer show={sideToggle} click={() => setSideToggle(false)}/>
        <Backdrop show={sideToggle} click={() => setSideToggle(false)}/>
          <Switch>
            <Route path='/' exact  component={Home} />
            <Route path='/login'  component={Login} />
            <Route path='/registration'  component={Registration} />
            <Route path='/upload'  component={Upload} />
            <Route path='/post/:id' component={Post} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/changesPassword' component={ChangesPassword} />
            <Route path='*' component={PageNotFound} />
          </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
