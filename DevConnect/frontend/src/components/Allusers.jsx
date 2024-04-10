import React from 'react'
import { Avatar, Flex, Box, Text, Image, useColorMode } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

export const Allusers = ({ user }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>


            <Link to={`/${user.username}`}>
                <Box display="flex" alignItems="center" position={'relative'} mb={6} margin={3} padding={2} border={'1px'} borderRadius={'10'} cursor={'pointer'}
                 _hover={{
                    bg: colorMode === "dark" ? "gray.500" : "blackAlpha.300",
                    transition: "background-color 0.3s ease", // Transition effect
                  }}
                 >


                    <Avatar
                        name={user.username}
                        src={user.profilePic}
                        size='xs'
                        mr={4}
                    //  position={'}
                    />
                    <Text> {user.username}  </Text>
                </Box>

            </Link>


        </>
    )
}
