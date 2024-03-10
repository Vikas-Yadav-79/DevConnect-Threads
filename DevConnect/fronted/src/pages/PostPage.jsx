import { Avatar, Flex, Text, Image, Box, Divider, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comments from '../components/Comments'

function PostPage() {

  const [liked, setLiked] = useState(false);
  return (
    <>
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
          "Let's Talk about threads"
        </Text>

        <Box borderRadius={6} overflow={"hidden"} border={"1px solid red.500"}>
          <Image
            src='/post1.png' w={"full"}

          />
        </Box>


        <Flex gap={3} my={2} >
          <Actions liked={liked} setLiked={setLiked} />
        </Flex>


        <Flex alignItems={"center"} gap={2}>
          <Text color={"gray.light"} fontFamily={""} fontSize={"sm"}>
            120 replies
          </Text>
          <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}>
          </Box>
          <Text color={"gray.light"} fontFamily={""} fontSize={"sm"}>
            {200 + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>


      <Divider my={4} h={3} borderRadius={"full"} />

      <Flex justifyContent={'space-between'} >
        <Flex alignItems={"center"} gap={2}>
          <Text fontSize={"2xl"}> 👋</Text>
          <Text color={"gray.light"}> Get the app to like,reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>


      <Divider my={0} h={3} borderRadius={"full"} />


      <Comments
        Comment="I Love this post! Looks really cool."
        createdAt="2d"
        username="John Doe"
        like={50}
        userAvatar="https://bit.ly/code-beast"


      />

      <Comments
        Comment="Amazing !"
        createdAt="3d"
        username="Radhika merchant"
        like={36}
        userAvatar="https://bit.ly/kent-c-dodds"


      />
      <Comments
        Comment="Call me Hacker huh 😒 . "
        createdAt="5d"
        username="Jemmy Coder"
        like={79}
        userAvatar="https://bit.ly/ryan-florence"


      />









    </>
  )
}

export default PostPage