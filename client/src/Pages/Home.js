import React from 'react'
import '../css/Home.css';
import {useEffect, useState,useContext} from 'react';
import axios from 'axios';
import {useHistory,Link} from 'react-router-dom';
import {Image} from 'cloudinary-react';
import {AiTwotoneLike} from 'react-icons/ai';
import {AiTwotoneDislike} from 'react-icons/ai';
import {AuthContext} from '../helpers/AuthContext';


function Home() {

  const [listOfPosts,setListOfPosts] = useState([]);
  const {authState} = useContext(AuthContext);

  let history = useHistory();

  useEffect(() =>{
    if (!localStorage.getItem("accessToken")){
      history.push('/login');
    } else {
      axios.get("http://localhost:3001/uploads").then((response) => {
          setListOfPosts(response.data);
      })
    }
  },[]);

  const likeAnUpload = (uploadId) => {
    axios.post("http://localhost:3001/likes",
    {UploadId: uploadId},
    {headers:{accessToken:localStorage.getItem("accessToken")}}
    ).then((response)=>{
      setListOfPosts(
        listOfPosts.map((post)=>{
          if (post.id === uploadId) {
            if (response.data.liked) {
              return { ...post, Likes: [...post.Likes, 0] };
            } else {
              const likesArray = post.Likes;
              likesArray.pop();
              return { ...post, Likes: likesArray };
            }
          } else {
            return post;
          }
        })
      );
    });
  };

  const dislikeAnUpload = (uploadId) => {
    axios.post("http://localhost:3001/dislikes",
    {UploadId: uploadId},
    {headers:{accessToken:localStorage.getItem("accessToken")}}
    ).then((response)=>{
      setListOfPosts(
        listOfPosts.map((post)=>{
          if (post.id === uploadId) {
            if (response.data.disliked) {
              return { ...post, Dislikes: [...post.Dislikes, 0] };
            } else {
              const dislikesArray = post.Dislikes;
              dislikesArray.pop();
              return { ...post, Dislikes: dislikesArray };
            }
          } else {
            return post;
          }
        })
      );
    });
  };

  return (
    <div>
      {listOfPosts.map((value,key)=>{
        return (
        <div key={key} className="post">
          <div className="username-box"><Link to={`/profile/${value.UserId}`}>{value.username}</Link></div>
          <div className="description-box">{value.description}</div>
          <div className="image-box" 
          onClick={()=>{history.push(`/post/${value.id}`)}}>
            <Image className='image'
             cloudName='dczo83hrj'
              publicId={value.images}/>
            </div>
          <div className='likes'>
            <div className="like-box">
              <button className='like' 
                onClick={()=>{likeAnUpload(value.id)}}>
                <AiTwotoneLike/>
                <label>{value.Likes.length}</label>
              </button>
            </div>
            <div className="dislike-box">
              <button className='dislike' 
                onClick={()=>{dislikeAnUpload(value.id)}}>
                <AiTwotoneDislike/>
                <label>{value.Dislikes.length}</label>
              </button></div>
          </div>
      </div>
        )
      })}
    </div>
  )
}

export default Home