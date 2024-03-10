import { Avatar, Flex, Box, Text, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Actions from './Actions'

const UserPost = ({ Likes, Replies, postImg, postTitle }) => {

    const [liked, setLiked] = useState(false)
    return (
        <Link to={"markzuckerburg/post/1"}>
            <Flex gap={3} mb={3} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"} >
                    <Avatar
                        src='/zuck-avatar.png'
                        name="Mark Zuckerberg"
                        size="md"
                    />
                    <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        <Avatar
                            size='xs'
                            name='John doe'
                            src='https://bit.ly/dan-abramov'
                            position={"absolute"}
                            top={"0px"}
                            left='15px'
                            padding={"2px"}
                        />
                        <Avatar
                            size='xs'
                            name='John doe'
                            src='https://bit.ly/sage-adebayo'
                            position={"absolute"}
                            bottom={"0px"}
                            right='-5px'
                            padding={"2px"}
                        />
                        <Avatar
                            size='xs'
                            name='John doe'
                            src='https://bit.ly/prosper-baba'
                            position={"absolute"}
                            bottom={"0px"}
                            left='4px'
                            padding={"2px"}
                        />
                    </Box>
                </Flex>

                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>

                        <Flex>
                            <Text fontSize={"sm"} fontWeight={"bold"}> Mark Zuckerburg</Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>


                        <Flex alignItems={"center"} gap={4}>
                            <Text color={"#75787C"} borderRadius={"half"} fontStyle={"sm"}> 1d</Text>
                            <BsThreeDots />

                        </Flex>



                    </Flex>

                    <Text fontSize={"sm"} >
                        {postTitle}
                    </Text>
                    {postImg && (
                        <Box borderRadius={6} overflow={"hidden"} border={"1px solid red.500"}>
                            <Image
                                src={postImg} w={"full"}

                            />
                        </Box>
                    )}



                    <Flex gap={3} my={1} >

                        <Actions liked={liked} setLiked={setLiked} />

                    </Flex>

                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}> {Replies} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>

                        <Text color={"gray.light"} fontSize={"sm"}> {Likes} Likes</Text>


                    </Flex>


                </Flex>




            </Flex>
        </Link>
    )
}

export default UserPost