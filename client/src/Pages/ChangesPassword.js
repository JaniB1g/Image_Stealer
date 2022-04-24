import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import '../css/Passwordchanges.css';

function ChangesPassword() {
  const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");

    const changePassword=() => {
        axios.put("http://localhost:3001/users/changepassword",
        {
            oldPassword:oldPassword,
            newPassword: newPassword,
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        ).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else{
                alert("A jelszó módosítása sikeresen megtörtént!")
            }
        })
    }
  return (
    <section>
        <div className='passwordChanges-container'>
            <div className='content-box'>
                <h2>Jelszó megváltoztatása</h2>
                <div className='input-box'>
                    <input type="text" placeholder='Régi jelszó'  onChange={(event)=>{
                        setOldPassword(event.target.value);
                    }}/>
                </div>
                <div className='input-box'>
                    <input type="text" placeholder='Új jelszó' onChange={(event)=>{
                        setNewPassword(event.target.value);
                    }}/>
                </div>
                <div className='input-box'>
                    <button className='passwordChanges-btn' onClick={changePassword}>Megváltoztat</button>
                </div>
             </div>
        </div>
    </section>
  )
}

export default ChangesPassword