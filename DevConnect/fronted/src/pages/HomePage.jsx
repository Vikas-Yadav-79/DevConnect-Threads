import { Button, Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import Post from '../components/Post';

export default function HomePage() {

  const showToast = useShowToast();
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])


  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      // setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast]);

  return (
    // <Link to={'/mark'}>
    //     <Flex w={"full"} justifyContent={"center"}>
    //     <Button  mx={"auto"}>Visit Profile Page</Button>

    //     </Flex>
    // </Link>
    <>
      {
        !loading && posts.length === 0 && <h1 style={{ textAlign: "center" }}>Follow Other Developers To See Their Feeds!</h1>
      }

      {
        loading && (
          <Flex justify={"center"}> <Spinner size={"xl"} /></Flex>
        )
      }

      {
        posts.map((post) =>(
          <Post key={post._id} post={post} postedBy={post.postedBy}/>
        ))
      }

    </>
  )
}
