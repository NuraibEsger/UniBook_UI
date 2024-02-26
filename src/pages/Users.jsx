import { Avatar, Box, Center, Container, Fade, Flex, Heading, Spinner, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react'
import { getUsers, postStudent, postTeacher } from '../services/userService'
import { useSelector } from "react-redux";
import {motion} from 'framer-motion'
import React from 'react'
import { useMutation, useQuery,} from 'react-query';
import AddButton from '../components/AddButton';

export default function Users() {
    
    const toast = useToast();
    
    const { token } = useSelector(x => x.account);

    const { isLoading, data, isError, error, refetch, isFetching } = useQuery("Users", () =>{
        return getUsers(token)
    },{
        cacheTime: 5000,
    });

    const mutationStudent = useMutation((userId) => postStudent(userId, token), {
        onSuccess: () => {
            toast({
                title: "Success Post",
                description: "Changed role",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
            refetch();
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        }
    });

    const mutationTeacher = useMutation((userId) => postTeacher(userId, token), {
        onSuccess: () => {
            toast({
                title: "Success Post",
                description: "Changed role",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
            refetch();
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        }
    });
    
    const handleAddStudent = (userId, userType) => {
        mutationStudent.mutate(userId, userType)
    };

    const handleAddTeacher = (userId, userType) =>{
        mutationTeacher.mutate(userId,userType)
    }

    if (isLoading) {
        return <Center><Spinner/></Center>
    }

    if(isError){
        toast({
            title: "Error",
            description: error.message,
            status:"error",
            duration:3000,
            isClosable:true,
            position:"top-right"
        })
    }

    if (!data || !data.data || !Array.isArray(data.data) || data.data.length == 0) {
        return <Center><Heading>No data available</Heading></Center>
    }


    return (
        <Container maxW="7xl" p={{base:5, md:10}}> 
        <Center gap={30} flexWrap="wrap">
            {data.data.map((user) =>(
                <Box
                key={user.id}
                maxH="400px"
                minH="354px"
                w="345px"
                boxShadow="lg"
                rounded="md"
                p={6}
                overflow="hidden"
                _hover={{ boxShadow: 'lg' }}
                role="group"
                >
                    <VStack spacing={5}>
                        <motion.div whileHover={{y:-5, scale:1.1}}>
                            <Box shadow="xl" _hover={{boxShadow:'lg'}} borderRadius="full">
                                <Avatar />
                            </Box>
                        </motion.div>
                        <Heading fontSize="xl" fontFamily="body" textTransform="capitalize" noOfLines={2}>
                            {user.email}
                        </Heading>
                        <Text
                        color="gray.500"
                        fontSize="lg"
                        noOfLines={{ base: 3, md: 4 }}
                        _groupHover={{ display: 'none' }}
                        display="block"
                        >
                            Student
                        </Text>
                        <Fade in>
                            <Text
                            color="gray.500"
                            fontSize="lg"
                            noOfLines={{ base: 3, md: 4 }}
                            _groupHover={{ display: 'block' }}
                            display="none"
                            >
                                {user.name} {user.surname}
                            </Text>
                            <Flex gap={5}>
                                <AddButton onClick={(userType) => handleAddStudent(user.id, userType)} userType="Student"/>
                                <AddButton onClick={(userType) => handleAddTeacher(user.id, userType)} userType="Teacher"/>
                            </Flex>
                        </Fade>
                    </VStack>
                </Box>
            ))}
        </Center>
    </Container>
    );
}

