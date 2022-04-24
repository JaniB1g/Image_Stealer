import React from 'react'
import {Link} from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
        <h1>PageNotFound :/</h1>
        <Link to='/'><h3>Vissza a kezdőlapra</h3></Link>
    </div>
  )
}

export default PageNotFound