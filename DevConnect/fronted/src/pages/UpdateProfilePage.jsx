import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

export default function UpdateProfilePage() {
    const [User,setUser] = useRecoilState(userAtom);
    const [inputs, setInputs] = useState(
        {

            name: User.name,
            username: User.username,
            email: User.email,
            bio: User.bio,
            password:"",
        }


    )
    const fileRef = useRef(null);
    return (
        <form >
            <Flex align={"center"} justify={"center"} my={6}>
                <Stack
                    spacing={4}
                    w={"full"}
                    maxW={"md"}
                    bg={useColorModeValue("white", "gray.dark")}
                    rounded={"xl"}
                    boxShadow={"lg"}
                    p={6}
                >
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id='userName'>
                        <Stack direction={["column", "row"]} spacing={6}>
                            <Center>
                                <Avatar size='xl' boxShadow={"md"} src={User.profilePic} />
                            </Center>
                            <Center w='full'>
                                <Button w='full' onClick={() =>{fileRef.current.click()}} >
                                    Change Avatar
                                </Button>
                                <Input type='file'  hidden  ref={fileRef}/>
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Full name</FormLabel>
                        <Input
                            placeholder='John Doe'

                            value={inputs.name}
                            onChange={(e) => setInputs({...inputs, name:e.target.value})}




                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>User name</FormLabel>
                        <Input
                            placeholder='johndoe'

                            value={inputs.username}
                            onChange={(e) => {setInputs({...inputs,username:e.target.value})}}

                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder='your-email@example.com'
                            value={inputs.email}

                            onChange={(e) => {setInputs({...inputs,email:e.target.value})}}

                            _placeholder={{ color: "gray.500" }}
                            type='email'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder='Your bio.'

                            value={inputs.bio}

                            onChange={(e) =>{setInputs({...inputs,bio:e.target.value})}}

                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder='password'

                            value={inputs.password}

                            onChange={(e) =>{setInputs({...inputs,password:e.target.value})}}


                            _placeholder={{ color: "gray.500" }}
                            type='password'
                        />
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Button
                            bg={"red.400"}
                            color={"white"}
                            w='full'
                            _hover={{
                                bg: "red.500",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={"green.400"}
                            color={"white"}
                            w='full'
                            _hover={{
                                bg: "green.500",
                            }}
                            type='submit'

                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    );
}
