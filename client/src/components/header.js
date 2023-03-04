import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './userContext'


export default function Header() {
 const {setUserInfo,userInfo} =useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:8000/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo);

      })
    })
  },[])
  function logout(){
    //Invalidate the token and reset username
    fetch('http://localhost:8000/logout',{
      credentials:'include',
      method:'POST',
    });
    setUserInfo(null);

  }
  const username=userInfo?.username
//   return (
//     <div><header>
//     <Link to="/logo" className="logo">My blog</Link>
//     <nav>
//       {
//         username && (
//           <>
//           <Link to='/create'>Create new post</Link>
//           <a>Logout</a>
//           </>
//         )
//       }
//       {
//         !username && (
//           <>
//            <Link to="/login">Login</Link>
//       <Link to="/register">Register</Link>
//           </>
//         )
//       }
     
//     </nav>
//   </header></div>
//   )
// }
return (
  <header>
    <Link to="/" className="logo">MyBlog</Link>
    <nav>
      {username && (
        <>
          <Link to="/create">Create new post</Link>
          <a onClick={logout}>Logout</a>
          
        </>
      )}
      {!username && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  </header>
);
}
