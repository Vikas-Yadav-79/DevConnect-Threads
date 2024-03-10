import { Box, Flex, VStack, Text, Link } from '@chakra-ui/react'
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Button, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Avatar } from '@chakra-ui/react'
import React from 'react'

function Userheader() {


  const toast = useToast()
  const copyUrl = () => {
    const currenturl = window.location.href;
    navigator.clipboard.writeText(currenturl).then(
      toast({
        title: 'Account created.',
        description: "Link Copied Successfully !",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    )
  }
  return (
    <VStack gap="4" alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"} gap={4}>

        <Box>
          <Text fontSize={"2xl"} fontWeight={"Bold"}>User Id</Text>

          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"small"}> User Name </Text>
            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}> threads.net</Text>
          </Flex>

        </Box>

        <Box>
          < Avatar
            name='Mark Zuckerberg '
            src='/zuck-avatar.png'
            size={
              {
                base : "lg",
                md :"xl",
              }
            }
          />

        </Box>

      </Flex>

      <Text>Co-FOunder ,Executive Chairman of facebook and CEO</Text>
      <Flex w="full" justifyContent={"space-between"} >
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"} >
            3.2K Followers
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