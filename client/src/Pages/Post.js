import React from 'react'
import {useParams,useHistory,Link} from 'react-router-dom';
import { useEffect,useState,useContext } from 'react';
import axios from 'axios';
import '../css/Post.css';
import {Image} from 'cloudinary-react';
import {AuthContext} from '../helpers/AuthContext';
import {BiMessageX} from 'react-icons/bi';
import {IoTrashSharp} from 'react-icons/io5'

function Post() {
  let {id} = useParams();

  const [postObject, setPostObject] = useState({});
  const [listOfComments,setListOfComments] = useState([]);
  const [newComment,setNewComment] = useState("");
  const {authState} = useContext(AuthContext);

  let history = useHistory();

  

  useEffect(()=>{
    axios.get(`http://localhost:3001/uploads/byId/${id}`).then((response) => {
        setPostObject(response.data);
  });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setListOfComments(response.data);
  });
   
},[]);

  const addComment = () => {
    axios.post('http://localhost:3001/comments',
    {
      comments:newComment,
      UploadId:id
    },
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }
  )
  .then((response) => {
    if (response.data.error) {
      console.log(response.data.error);
    } else {
        const commentToAdd = {comments: newComment,username:response.data.username};
        setListOfComments([...listOfComments,commentToAdd]);
        setNewComment("");
      }
    });
  }

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setListOfComments(
          listOfComments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/uploads/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
      });
  };

  const editPost = (option) =>{
    if (option === "description"){
      let newDescription = prompt("Leírás módosítása: ");
      axios.put("http://localhost:3001/uploads",
      {
        newDescription:newDescription,
        id:id,
      },
      {
        headers: {accessToken: localStorage.getItem("accessToken")},
      }
      );
      setPostObject({...postObject,description:newDescription});
    }
  }
  return (
    <div className='post-container'>
         <div className='left-box'>
            <div className="post-wrapper">
                <div className="post-username_box">
                  <Link to={`/profile/${postObject.UserId}`}>
                    {postObject.username}
                  </Link> 
                  {authState.username === postObject.username &&
                    <button className='post-delete-btn' onClick={() => {
                      deletePost(postObject.id);}}>
                      <IoTrashSharp/>
                    </button>
                  }
                </div>
                <div className="post-description_box" onClick={() => {
                  if (authState.username === postObject.username){
                  editPost("description")}}
                }
                  >
                    {postObject.description}
                </div>
                <div className="post-image_box"><Image className="image" cloudName='dczo83hrj' publicId={postObject.images}/></div>
            </div>
         </div>

         <div className='right-box'>
             <div className="comment-box">
                <input type="text" placeholder='Hozzászólás írása...' autoComplete='off' value={newComment} onChange={(event) =>{setNewComment(event.target.value)}} />
                <button className='comment-btn' onClick={addComment}>Comment</button>
              </div>
              <div className='listOfComments'>
                {listOfComments.map((value,key) =>{
                  return (
                  <div key={key} className='comment'>
                    <label>{value.username}: </label>
                    {value.comments}
                    {authState.username === value.username &&(<button className='comment-btn' onClick={() => {
                      deleteComment(value.id);
                    }}><BiMessageX/></button>)}
                  </div>
                  );
                })}
              </div>
          </div>
    </div> 
  )
}

export default Post