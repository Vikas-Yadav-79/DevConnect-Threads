import React from 'react'
import Userheader from '../components/Userheader'
import UserPost from '../components/UserPost'

function UserPage() {
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