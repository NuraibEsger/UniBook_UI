import { Box, Card, CardBody, CardHeader, Center, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import { getUsers, postStudent, postTeacher } from '../services/userService'
import { useSelector } from "react-redux";
import React from 'react'
import { useMutation, useQuery,} from 'react-query';
import AddButton from '../components/AddButton';

export default function Users() {
    
    const toast = useToast();
    
    const { token, role } = useSelector(x => x.account);

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
        return <Spinner />
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
        return <h2>No data available</h2>;
    }

    if(role !== "Rector") return null

    return (
        <Center>
            <Flex gap={300}>
                <Card>
                    <CardHeader>
                        <Heading size='md'>User dashboard</Heading>
                    </CardHeader>
                    <CardBody >
                        <Stack flexDir="row" flexWrap="wrap" gap={20} divider={<StackDivider />} spacing='4'>
                            {data.data.map((user) => (
                                <Box key={user.id}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        {user.email}
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {user.name} {user.surname}  
                                    </Text>
                                    <Flex gap={10}>
                                        <AddButton onClick={(userType) => handleAddStudent(user.id, userType)} userType="Student"/>
                                        <AddButton onClick={(userType) => handleAddTeacher(user.id, userType)} userType="Teacher"/>
                                    </Flex>
                                </Box>
                            ))}
                        </Stack>
                    </CardBody>
                </Card>
            </Flex>
        </Center>
    );
}

