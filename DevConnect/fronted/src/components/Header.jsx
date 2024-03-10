import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'


function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex justifyContent={"center"} mt={6} mb='12'>

            <Image

                cursor={"pointer"}
                src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
                alt='logo'
                onClick={toggleColorMode}
                w={6}

            />

        </Flex>
    )
}

export default Header