import React, { useEffect, useState } from 'react'
import Userheader from '../components/Userheader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import { Flex ,Spinner} from '@chakra-ui/react'
import Post from '../components/Post'
import useGetUserProfile from '../hooks/useGetUserProfile'

function UserPage() {

  const showToast = useShowToast();

  // const [user,setUser] = useState(null);

  const { user, loading } = useGetUserProfile();


  const { username } = useParams()
	const [fetchingPosts, setFetchingPosts] = useState(true);
  const [posts,setPosts] = useState([])


  useEffect(() =>{
   
    const getPost = async () =>{
      setFetchingPosts(true)
      try {

        const res = await fetch(`/api/posts/user/${username}`)
        const data = await res.json()
        if(data.error){
          showToast("Error" , data.error,"error")
          return;

        }
        console.log(data)
        setPosts(data);

        
      } catch (error) {
        showToast("Error" , error,"error")
        setPosts([])
        
      }finally{
        setFetchingPosts(false)
      }

    }

    getPost();

  },[username,showToast]);

  if(!user && loading) {return(
    <Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>

  )}

  if (!user && !loading) return <h1>User not found</h1>;





  return (
    <>
      <Userheader user={user} />

      {
        !fetchingPosts && posts.length ===0 && <h1>User has no Post Yet</h1>
      }
      {
        fetchingPosts && (
          <Flex justifyContent={"center"}>
            <Spinner size={"xl"}/>

          </Flex>
        )
      }

      {
        posts && posts.map((post) =>(
          <Post key={post._id} post={post} postedBy={post.postedBy}/>
        ))
      }
      {/* <UserPost Likes={1200} Replies={481} postImg="/post1.png" postTitle="Let's talk about threads"/>
      <UserPost Likes={451} Replies={12} postImg="/post2.png" postTitle="Nice Tutorial"/>

      <UserPost Likes={321} Replies={989} postImg="/post3.png" postTitle="I Love this Guy"/>

      <UserPost Likes={212} Replies={56}  postTitle="I got Nothing to post Lazy thread here:"/> */}

      
    </>
  )
}

export default UserPage