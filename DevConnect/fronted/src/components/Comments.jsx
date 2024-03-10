import { Avatar, Divider, Flex,Text } from '@chakra-ui/react';
import React ,{ useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions';

const Comments = ({Comment,username,createdAt,like,userAvatar}) => {

    const [liked,setLiked] = useState(false);

  return (
    <>

    <Flex flexDirection={"column"} w={"full"}  mb={-2}>
        <Flex justifyContent={"space-between"} my={2}>


            <Flex alignItems={"center"} gap={2}>
            <Avatar src ={userAvatar} size={"sm"}/>
            <Text  fontSize={"md"} fontWeight={"bold"}>
                {username}
            </Text>

            </Flex>

            <Flex alignItems={"center"} gap={3}>
                <Text color={"gray.light"} fontSize={"sm"} >{createdAt}</Text>
                <BsThreeDots /> 

            </Flex>

           




        </Flex>
        

        <Text fontFamily={""} fontSize={'sm'} mx={10}>{Comment}</Text>
        <Flex mx={10} my={2} alignItems={"center"}>
            <Actions liked={liked} setLiked={setLiked}/>
        </Flex>

        <Flex alignItems={"center"} mx={10} my={-1}>
            <Text fontSize={"sm"} color={"dark.light"} > {(like) +(liked ? 1: 0)} likes</Text>
        </Flex>



        <Divider my={3} h={3} borderRadius={"full"}/>






    </Flex>
    </>
  )
}

export default Comments