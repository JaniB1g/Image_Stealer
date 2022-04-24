import React from 'react';
import '../css/Upload.css';
import axios from 'axios';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

function Upload() {
  let history = useHistory();

const [description,setDescription] = useState("");
const [images,setImages] = useState([]);

const upload = () => {
    const formData = new FormData();
    formData.append("file", images[0]);
    formData.append("upload_preset", "z563ljec");
    axios.post(
      `https://api.cloudinary.com/v1_1/dczo83hrj/image/upload`,
      formData
    ).then((response) => {
      const fileName = response.data.public_id;
      
      const data = {description: description,images: fileName,};
      axios.post("http://localhost:3001/uploads", data,{
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then(() => {
        history.push("/");
      });
    });
  };
  return (
    <section>
    <div className='upload-container'>
        <div className='upload_content-box'>
            <div className='upload_form-box'>
                  <h1>Oszd meg élményeid az másokkal!</h1>
                    <div className='input-box'>
                            <input type="text" name='description' placeholder='Leírás' onChange={(event) =>{
                                setDescription(event.target.value)
                            }}/>
                    </div>
                    <div className='input-box'>
                        <input type="file" name="images"  onChange={(event) => {
                            setImages(event.target.files)
                        }}/>
                    </div>
                    <div className='button-box'>
                        <button className='upload-btn' onClick={upload}>Feltöltés</button>
                    </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Upload