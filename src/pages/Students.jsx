import { Avatar, Box, Button, Center, Container, Fade, Heading, Spinner, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery } from 'react-query';
import { deleteStudents, getStudents } from '../services/studentService';
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux';

export default function Students() {
    const toast = useToast();

    const {token} = useSelector(x=>x.account)

    const {isLoading, data, isError, error, refetch} = useQuery("Student",()=>{
        return getStudents(token);
    },{
        cacheTime:5000,
    })

    const mutation = useMutation((userId) => deleteStudents(userId, token),{
        onSuccess: () => {
            toast({
                title: "Success Delete",
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

    if(isLoading){
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

    const deleteStudent = (userId) => {
        mutation.mutate(userId)
    }
    

  return (
    <Container maxW="7xl" p={{base:5, md:10}}> 
        <Center gap={30} flexWrap="wrap">
            {data.data.map((student) =>(
                <Box
                key={student.id}
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
                            {student.email}
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
                                {student.name} {student.surname}
                            </Text>
                            <Button 
                            _groupHover={{ display: 'block' }}
                            display="none" 
                            onClick={() => deleteStudent(student.id)} mt={10} colorScheme='red'
                            >Delete student
                            </Button>
                        </Fade>
                    </VStack>
                </Box>
            ))}
        </Center>
    </Container>
  )
}
