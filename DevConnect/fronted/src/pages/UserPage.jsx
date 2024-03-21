import React, { useEffect, useState } from 'react'
import Userheader from '../components/Userheader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'

function UserPage() {

  const [user,setUser] = useState(null)

  const { username } = useParams()

  useEffect(() =>{
    const getUser = async () =>{
      try{

        const res = await fetch(`/api/users/profile/${username}`);
				const data = await res.json();

        console.log(data)


      }
      catch(err){

        console.log(err)

      }
    };

    getUser();

  },[username]);




  return (
    <>
      <Userheader />
      <UserPost Likes={1200} Replies={481} postImg="/post1.png" postTitle="Let's talk about threads"/>
      <UserPost Likes={451} Replies={12} postImg="/post2.png" postTitle="Nice Tutorial"/>

      <UserPost Likes={321} Replies={989} postImg="/post3.png" postTitle="I Love this Guy"/>

      <UserPost Likes={212} Replies={56}  postTitle="I got Nothing to post Lazy thread here:"/>

      
    </>
  )
}

export default UserPage