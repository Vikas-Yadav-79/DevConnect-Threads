import { AddIcon } from "@chakra-ui/icons";
import {
    Button,
    CloseButton,
    Flex,
    FormControl,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useImagePreview } from "../hooks/useImagePreview";
import React, { useRef, useState } from 'react'
import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom"

export const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleImageChange, imageUrl, setImageUrl } = useImagePreview();
    const [postText, setPostText] = useState("")
    const [remainingChar, setRemainingChar] = useState(500);
    const [loading,setLoading]  = useState(false)


    const imageRef = useRef(null)
    const showToast = useShowToast();
    const user = useRecoilValue(userAtom)
    const MAX_CHAR = 500;

    const handelTextChange = (e) => {

        const inputText = e.target.value;
        if (inputText.length > 500) {
            const truncatedText = inputText.slice(0, MAX_CHAR)
            setPostText(truncatedText)
            setRemainingChar(0)


        }
        else {
            setPostText(inputText)
            setRemainingChar(MAX_CHAR - inputText.length)

        }


    }

    const handleCreatePost = async () => {
        try {
            setLoading(true)

            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postedBy: user._id, text: postText, img: imageUrl })


            })
            const data = await res.json()
            if (data.error) {
                showToast("Error", data.error, "error")
                return;
            }
            showToast("Success", "Post Created Successfully", "success");
            onClose()
            setImageUrl("")
            setPostText("")


        }
        catch (err) {
            showToast("Error",err,"error")

        }
        finally{
            setLoading(false)
        }




    }

    return (
        <>
            <Button onClick={onOpen} position={"fixed"} bottom={3} right={3} bg={useColorModeValue("gray.200", "gray.dark")} size={{ base: "sm", sm: "md" }}>
                <AddIcon size={20}/>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea placeholder="Post content goes here"
                                onChange={handelTextChange}
                                value={postText}

                            />
                            <Text fontSize={"sm"} fontFamily={"bold"} textAlign={"right"} m={1} color={"gray.400"}>
                                {remainingChar}/{MAX_CHAR}
                            </Text>
                            <Input
                                type="file"
                                hidden
                                ref={imageRef}
                                onChange={handleImageChange}
                            />
                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={16}
                                onClick={() => imageRef.current.click()}
                            />
                        </FormControl>
                        {
                            imageUrl && (
                                <Flex mt={5} w={"full"} position={"relative"}>
                                    <Image
                                        src={imageUrl}
                                        alt="Post Image"
                                    />
                                    <CloseButton
                                        onClick={() => {
                                            setImageUrl("");
                                        }}
                                        bg={"gray.800"}
                                        position={"absolute"}
                                        top={2}
                                        right={2}
                                    />

                                </Flex>
                            )
                        }

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
