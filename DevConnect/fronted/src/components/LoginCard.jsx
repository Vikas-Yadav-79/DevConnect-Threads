import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import useShowToast from '../hooks/useShowToast'
import userAtom from '../atoms/userAtom'
  
  export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const setUser = useSetRecoilState(userAtom)
    const [loading, setLoading] = useState(false)
    const [inputs,setInputs] = useState({
      username:"",
      password:""
    });
    const showToast = useShowToast();

    const handleLogin = async () =>{
      setLoading(true)
      try {

        const res = await fetch("/api/users/login",{
          method:"POST",
          headers : {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(inputs)
        });

        const data = await res.json();

        if(data.error){
          showToast("ERROR",data.error,"error")
          return;
        }

        localStorage.setItem("user-threads" ,JSON.stringify(data));
        setUser(data);


        
      } catch (error) {
        showToast("ERROR" , error,"error")
        
      }
      finally{
        setLoading(false)
      }

    }
  
    return (
      <Flex
       
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}
            w={{
                base:'100px',
                sm:'400px'
            }}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" 
                onChange={
                  (e) => {
                    setInputs(
                      {
                        ...inputs, 
                        username: e.target.value
                      }
                    )

                  }

                }
              />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} 
                  onChange={
                    (e) => {
                      setInputs(
                        {
                          ...inputs,
                          password:e.target.value
                        }
                      )
                    }
                  }
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                onClick={handleLogin}
                isLoading={loading}
                  loadingText="Logging In"
                  size="lg"
                  bg={useColorModeValue('gray.600', 'gray.700')}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue('gray.700', 'gray.600'),
                  }}>
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account ? <Link color={'blue.400'} onClick={ () =>{setAuthScreen("signup")} }>SingUp</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }