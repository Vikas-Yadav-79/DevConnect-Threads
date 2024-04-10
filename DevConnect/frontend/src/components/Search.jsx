import React, { useEffect, useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'

import { IconButton, Button, Modal, Input, useColorModeValue,Text, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl,Box } from '@chakra-ui/react'
import useShowToast from '../hooks/useShowToast';
import { Allusers } from './Allusers';


export const Search = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([]);
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
            showToast("Error", error, 'error')
        }
        finally {
            setLoading(false)
        }
    }
    const handleInputChange = (e) => {
        setUsername(e.target.value);
    }

    useEffect(() => {

        const getallUsers = async () => {
            try {
                const res = await fetch("/api/users/getall")
                const data = await res.json()
                if (data.error) {
                    showToast("Error", data.error, 'error')
                    return;
                }
                setUsers(data);
                console.log(data)

            } catch (error) {
                showToast("Error", error, 'error')

            }

        }
        getallUsers();

    }, [showToast])

    return (
        <>
            <IconButton position={'fixed'} bottom={3} left={'50%'} transform={"translateX(-50%)"} icon={<SearchIcon />} size={{ base: "sm", sm: "md" }} bg={useColorModeValue("gray.200", "gray.dark")} onClick={handleSearchClick} />

            <Modal isOpen={isOpen} onClose={handleModalClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Search</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input type="text" placeholder="Username" value={username} onChange={handleInputChange} />

                            <Box>
                                <Text p={1} mt={1}textAlign={'center'} fontSize={'large'} fontWeight={'bold'}>List  of all users </Text>
                            </Box>


                            <Box mt={3}>
                            {
                                users && users.map((user) => (

                                    <Allusers key={user._id} user={user} />



                                ))
                            }


                            </Box>

                           


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
