import React, { useEffect, useState } from 'react'
import Userheader from '../components/Userheader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import { Flex ,Spinner} from '@chakra-ui/react'

function UserPage() {

  const showToast = useShowToast();

  const [user,setUser] = useState(null);

  const { username } = useParams()
	const [fetchingPosts, setFetchingPosts] = useState(true);


  useEffect(() =>{
    const getUser = async () =>{
      try{

        const res = await fetch(`/api/users/profile/${username}`);
				const data = await res.json();
        console.log(data);
        if(data.error){
          showToast("Error" , data.error,"error")
          return;
        }
        setUser(data)
      }
      catch(err){

        showToast("Error" , err,"error")

      }
      finally{
        setFetchingPosts(false)
      }
    };

    getUser();

  },[username,showToast]);

  if(!user && fetchingPosts) {return(
    <Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>

  )}

  if (!user && !fetchingPosts) return <h1>User not found</h1>;




  return (
    <>
      <Userheader user={user} />
      <UserPost Likes={1200} Replies={481} postImg="/post1.png" postTitle="Let's talk about threads"/>
      <UserPost Likes={451} Replies={12} postImg="/post2.png" postTitle="Nice Tutorial"/>

      <UserPost Likes={321} Replies={989} postImg="/post3.png" postTitle="I Love this Guy"/>

      <UserPost Likes={212} Replies={56}  postTitle="I got Nothing to post Lazy thread here:"/>

      
    </>
  )
}

export default UserPage