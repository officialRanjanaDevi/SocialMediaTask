import React, { useEffect } from 'react'
import  {Link,useNavigate}  from 'react-router-dom';

const Protected = (props) => {
    const {Component}=props;
    const navigate=useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('isLoggedIn')){
        navigate('/login');
      }
    })
    return (
    <div className='h-full w-full'>
      <Component/>
    </div>
  )
}

export default Protected
