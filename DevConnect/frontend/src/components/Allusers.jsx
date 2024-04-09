import React from 'react'
import { Avatar, Flex, Box, Text, Image, useColorMode } from '@chakra-ui/react'

export const Allusers = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box display="flex" alignItems="center" position={'relative'} mb={4} margin = {2}padding={2}border={'1px'} borderRadius={'10'} cursor={'pointer'}>
                <Avatar 
                name="ndc" 
                src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
                size='xs'
                 mr={4} 
                //  position={'}
                 />
                <Text  >User 1 </Text>
            </Box>
        </>
    )
}
