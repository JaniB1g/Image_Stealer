import React, {useEffect, useState}  from 'react';
import { useParams,useHistory } from 'react-router-dom';
import axios from 'axios';
import {Image} from 'cloudinary-react';
import '../css/Profile.css';
import {AiTwotoneLike} from 'react-icons/ai';
import {AiTwotoneDislike} from 'react-icons/ai';

function Profile() {
let {id} = useParams();
let history = useHistory();

const [username, setUsername] = useState("");
const [listOfUploads,setLisOfUploads] = useState([]);

useEffect(()=>{
  axios.get(`http://localhost:3001/users/userinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/uploads/byUserId/${id}`).then((response)=>{
      setLisOfUploads(response.data);
    });
},[]);
  return (
    <div className='profile-container'>
      <div className="userInfo">
        {" "}
        <h1> Üdvözlünk {username} </h1>
        <button className='changesPassword-btn' onClick={()=>{
          history.push("/changesPassword")
        }}>Jelszó megváltoztatása</button>
      </div>
      <div className='container'>
        {listOfUploads.map((value,key)=>{
          return (
            <div key={key} className="posts" >
                <div className="description-box">{value.description}</div>
                <div className='image-box'  onClick={()=>{history.push(`/post/${value.id}`)}}>
                  <Image className='image'
                  cloudName='dczo83hrj'
                  publicId={value.images}/>
                </div>
                <div className='likes'>
                <div className='like-count'>
                 <label><AiTwotoneLike/> {value.Likes.length}</label>
                </div>
                <div className='dislike-count'>
                <label><AiTwotoneDislike/> {value.Dislikes.length}</label>
                </div>
                </div>
              </div>
          )
        })}
      </div>
    </div>
  )
}

export default Profile