import { Flex, Image, Link, useColorMode } from '@chakra-ui/react'
import React from 'react'
import userAtom from '../atoms/userAtom';
import { useRecoilState, useRecoilValue } from "recoil";
import { Link as RouterLink } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";


function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const user = useRecoilValue(userAtom)

    return (

        <Flex justifyContent={user ? 'space-between' : 'center'} mt={6} mb='12'>

            {
                user &&  (
                    <Link as={RouterLink} to="/">
                        <AiFillHome size={24}/>
                    </Link>
                )
            }
            

            <Image

                cursor={"pointer"}
                src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
                alt='logo'
                onClick={toggleColorMode}
                w={6}

            />
            {
                user &&  (
                    <Link as={RouterLink} to={`/${user.username}`}>
                        <RxAvatar size={24}/>
                    </Link>
                )
            }

        </Flex>
    )
}

export default Header