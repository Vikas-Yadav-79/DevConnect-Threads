import { Avatar, Flex, Box, Text, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Actions'
import useShowToast from '../hooks/useShowToast'
import { formatDistanceToNow } from "date-fns";

const Post = ({ post, postedBy }) => {

    const [liked, setLiked] = useState(false)
    const showToast = useShowToast();
    const [user, setUser] = useState(null)
    const navigate = useNavigate();;

    useEffect(() => {

        const getUser = async () => {
            try {

                const res = await fetch("/api/users/profile/" + postedBy)
                const data = await res.json()
                console.log(data)
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
								{post.createdAt? formatDistanceToNow(new Date(post.createdAt)) + " ago" :"1d ago"} 
                               
							</Text>
                            <BsThreeDots />

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

                        <Actions liked={liked} setLiked={setLiked} />

                    </Flex>

                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}> {post.replies.length} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>

                        <Text color={"gray.light"} fontSize={"sm"}> {post.likes.length} Likes</Text>


                    </Flex>


                </Flex>




            </Flex>
        </Link>
    )
}

export default Post