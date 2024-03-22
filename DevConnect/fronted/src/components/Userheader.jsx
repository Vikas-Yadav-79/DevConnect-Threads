import { Box, Flex, VStack, Text, Link } from '@chakra-ui/react'
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Button, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Avatar } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom"
import useShowToast from '../hooks/useShowToast';
import { Link as RouterLink } from 'react-router-dom';

const Userheader = ({ user }) => {


  const showToast = useShowToast()
  const currentUser = useRecoilValue(userAtom); // loggedin user
  const [following,setfollowing] = useState(user.followers.includes(currentUser._id))
  const [updating,setUpdating] = useState(false)


  const handleFollowUnfollow = async () =>{
    if(!currentUser){
      showToast("Error","Please login to follow others","error")
      return;
    }
    if(updating) return;
    setUpdating(true)
    try{

      const res = await fetch(`/api/users/follow/${user._id}`,{
        method:"POST",
        headers : {
          "Content-Type":"application/json"
        }
      })
      const data = res.json()
      if(data.error){
        showToast("Error",data.error,"error")
        return;

      }
      if(following){
        user.followers.pop()
        showToast("",`You unfollowed ${user.name}`,"success")
        
      }
      else{
        user.followers.push(currentUser._id)
        showToast("",`You followed ${user.name}`,"success")
        
      }
      
      setfollowing(!following)
      console.log(data);
    }
    catch(err){
      showToast("Error",err,"error")

    }finally{
      setUpdating(false)
    }
  }

  const copyUrl = () => {
    const currenturl = window.location.href;
    navigator.clipboard.writeText(currenturl).then(
      showToast('Account created.', "Link Copied Successfully !", 'success')
    )
  }


  return (
    <VStack gap="4" alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"} gap={4}>

        <Box>
          <Text fontSize={"2xl"} fontWeight={"Bold"}>{user.name}</Text>

          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"small"}> {user.username} </Text>
            <Text fontSize={"xs"} bg={"gray.400"} color={"gray.light"} p={1} borderRadius={"full"}> threads.net</Text>
          </Flex>

        </Box>

        <Box>

          {
            user.profilePic && (
              < Avatar
                name={user.username}
                src={user.profilePic}
                size={
                  {
                    base: "lg",
                    md: "xl",
                  }
                }
              />

            )
          }
          {
            !user.profilePic && (
              < Avatar
                name='Mark Zuckerberg '
                src='/zuck-avatar.png'
                size={
                  {
                    base: "lg",
                    md: "xl",
                  }
                }
              />

            )
          }


        </Box>

      </Flex>

      <Text>{user.bio} </Text>


      {
        user._id === currentUser?._id && (
          <Link as={RouterLink} to={"/update"}>
        <Button size={"sm"} >
          Update Profile
        </Button>
      </Link>
        )
        
      }
      {
        currentUser?._id  !== user._id  && (
          <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow":"Follow"}
        </Button>

        )
      }
      


      

      
      <Flex w="full" justifyContent={"space-between"} >
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"} >
            {user.followers.length} Followers
          </Text>
          <Box bg={"gray.light"} borderRadius={"full"} w={1} h={1}> </Box>
          <Link color={"gray.light"}>Instagram.com</Link>

        </Flex>



        <Flex >

          <Box className='icon-container'>
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className='icon-container'>
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyUrl}> Copy Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>

          </Box>
        </Flex>
      </Flex>


      <Flex w={"full"}>

        <Flex flex={1} borderBottom={"1.5px solid grey"} justifyContent={"center"} pb={6} cursor={"pointer"} >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1.px solid  white"} justifyContent={"center"} pb={6} cursor={"pointer"} >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>

      </Flex>

    </VStack>
  )
}

export default Userheader