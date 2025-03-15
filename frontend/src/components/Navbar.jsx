import React from 'react'
import {Link} from 'react-router-dom'

export function Navbar() {
  return (
    <div>
        <Link to='/'>Home</Link>
         <Link to='/login'>login</Link>
          <Link to='/register'>register</Link>


    </div>
  )
}
