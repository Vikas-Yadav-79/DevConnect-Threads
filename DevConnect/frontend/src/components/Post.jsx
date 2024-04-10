import { Avatar, Flex, Box, Text, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Actions'
import useShowToast from '../hooks/useShowToast'
import { formatDistanceToNow } from "date-fns";
import {DeleteIcon} from "@chakra-ui/icons"
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'

const Post = ({ post, postedBy,setPosts }) => {

    const [liked, setLiked] = useState(false)
    const showToast = useShowToast();
    const [user, setUser] = useState(null)
    const currentUser = useRecoilValue(userAtom)
    const navigate = useNavigate();
    


    const randomNumber = Math.floor(Math.random() * 10) + 1;
    useEffect(() => {

        
        const getUser = async () => {
            try {

                const res = await fetch("/api/users/profile/" + postedBy)
                const data = await res.json()
                if (data.error) {
                    showToast("Error", data.error, "error")
                    return;
                }
                setUser(data)

            }
            catch (err) {
                showToast("Error", err, "error")
                setUser(null);
            }
        }
        
        getUser()
    }, [postedBy, showToast])

    const handleDeletePost = async (e) =>{
        try {
            e.preventDefault()
            if(!window.confirm("Are You Sure You Want To Delete This Post")) return;
            const res = await fetch(`/api/posts/${post._id}`,
            {method:"DELETE"}
            )
            const data = await res.json()

            if (data.error) {
                showToast("Error", data.error, "error")
                return;
            }
            showToast("Success","Post Deleted Succesfully","success");
           // For instant reload after deleting a post we will filter those post from set of all available post where there id is not equal to given post
           setPosts((prev) => prev.filter((thosePost) => thosePost._id  !== post._id));

            
        } catch (error) {
            showToast("Error", err, "error")
            
        }
    }

    if (!user) return null;
    return (
        <Link to={`/${user.username}/posts/${post._id}`}>
            <Flex gap={3} mb={3} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"} >
                    <Avatar
                        src={user.profilePic}
                        name={user.name}
                        size="md"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${user.username}`);
                        }}
                    />
                    <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        {post.replies.length === 0 && <Text textAlign={"center"}>🥱 </Text>}
                        {post.replies[0] &&
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={post.replies[0].userProfilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        }
                        {post.replies[1] &&
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={post.replies[1].userProfilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        }
                        {post.replies[2] &&
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={post.replies[2].userProfilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        }


                    </Box>
                </Flex>

                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>

                        <Flex>
                            <Text fontSize={"sm"} fontWeight={"bold"} onClick={(e) => {
                                e.preventDefault();
                                navigate(`/${user.username}`);
                            }}> {user.username}</Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>


                        <Flex alignItems={"center"} gap={4}>
                        <Text fontSize={"sm"} width={36} textAlign={"right"} color={"gray.light"}>
								{post.createdAt? formatDistanceToNow(new Date(post.createdAt)) + " ago" :randomNumber + " day ago"} 
                               
							</Text>

                            {
                                currentUser?._id === user._id && (<DeleteIcon  marginLeft={3} boxSize={6} onClick={handleDeletePost} />
                                )
                            }
                            
                        </Flex>



                    </Flex>

                    <Text fontSize={"sm"} >
                        {post.text}
                    </Text>
                    {post.img && (
                        <Box borderRadius={6} overflow={"hidden"} border={"1px solid red.500"}>
                            <Image
                                src={post.img} w={"full"}

                            />
                        </Box>
                    )}



                    <Flex gap={3} my={1} >

                        <Actions post={post}/>

                    </Flex>



                </Flex>




            </Flex>
        </Link>
    )
}

export default Post