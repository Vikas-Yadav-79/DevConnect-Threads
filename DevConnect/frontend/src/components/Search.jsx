import React, { useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'

import { IconButton, Button, Modal, Input,useColorModeValue, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl } from '@chakra-ui/react'
import useShowToast from '../hooks/useShowToast';


export const Search = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false)
    const showToast = useShowToast()

    const handleSearchClick = () => {
        setIsOpen(true)
    }
    const handleModalClose = () => {
        try {
            setIsOpen(false)
            setLoading(true)
            let newUrl;
            const currentUrl = window.location.href
            const lastSymbol = currentUrl[currentUrl.length - 1]

            if (lastSymbol === '/') {
                newUrl = window.location.href + username;
            }
            else {
                newUrl = window.location.href + username;
            }
            window.location.href = newUrl;

        } catch (error) {
            showToast("Error",error,'error')
        }
        finally {
            setLoading(false)
        }
    }
    const handleInputChange = (e) => {
        setUsername(e.target.value);
    }
    return (
        // <Button position={"fixed"}  bottom={3} left={3} size={{ base: "sm", sm: "md" }} bg={useColorModeValue("gray.200", "gray.dark")} onClick={handleLogout}>
        // 		<FiLogOut size={20} />
        // 	</Button>
        <>
            <IconButton  position={'fixed'} bottom={3} left={'50%'} transform={"translateX(-50%)"}  icon={<SearchIcon />} size={{ base: "sm", sm: "md" }} bg={useColorModeValue("gray.200", "gray.dark")}  onClick={handleSearchClick} />

            <Modal isOpen={isOpen} onClose={handleModalClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Search</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input type="text" placeholder="Username" value={username} onChange={handleInputChange} />

                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleModalClose} colorScheme='blue' isLoading={loading}>Search</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



        </>


    )
}
