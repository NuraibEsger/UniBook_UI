import { Avatar, Box, Button, Center, Container, Fade, Heading, Spinner, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react'
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion'
import { deleteTeacher, getTeachers } from '../services/teacherService';
import React from 'react'
import AddToGroup from '../components/Group/AddToGroup';

export default function Teachers() {
    const toast = useToast();

    const {token} = useSelector(x=>x.account)

    const {isLoading, data, isError, error, refetch} = useQuery("Teacher",()=>{
        return getTeachers(token);
    },{
        cacheTime:5000,
    })

    const mutation = useMutation((userId) => deleteTeacher(userId, token),{
        onSuccess: () => {
            toast({
                title: "Success delete",
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
        return <Center><Heading>No data available</Heading ></Center>
    }

    const handleDeleteTeacher = (userId) => {
        mutation.mutate(userId)
    }


  return (
    <Container maxW="7xl" p={{base:5, md:10}}> 
        <Center gap={30} flexWrap="wrap">
            {data.data.map((teacher) =>(
                <Box
                key={teacher.id}
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
                            {teacher    .email}
                        </Heading>
                        <Text
                        color="gray.500"
                        fontSize="lg"
                        noOfLines={{ base: 3, md: 4 }}
                        _groupHover={{ display: 'none' }}
                        display="block"
                        >
                            {teacher.subjectName}
                        </Text>
                        <Fade in>
                            <Center flexDir="column">
                                <Text
                                color="gray.500"
                                fontSize="lg"
                                noOfLines={{ base: 3, md: 4 }}
                                _groupHover={{ display: 'block' }}
                                display="none"
                                >
                                    {teacher.name} {teacher.surname}
                                </Text>
                                <Button 
                                _groupHover={{ display: 'block' }}
                                display="none" 
                                onClick={() => handleDeleteTeacher(teacher.id)} mt={10} colorScheme='red'
                                >Delete student
                                </Button>
                                <AddToGroup userId={teacher.id}/>
                            </Center>
                        </Fade>
                    </VStack>
                </Box>
            ))}
        </Center>
    </Container>
  )
}
