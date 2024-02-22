import { Box, Card, CardBody, CardHeader, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import { getUsers, postStudent } from '../services/userService'
import { useSelector } from "react-redux";
import React from 'react'
import { useMutation, useQuery } from 'react-query';
import AddButton from '../components/AddButton';

export default function Users() {
    
    const toast = useToast();
    
    const { isLoading, data, isError, error } = useQuery("Users", () => {
        return getUsers(token)
    });

    const { token, role } = useSelector(x => x.account);

    const mutation = useMutation((userId) => postStudent(userId, token), {
        onSuccess: () => {
            toast({
                title: "Success Post",
                description: "Changed role",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
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
        mutation.mutate(userId, userType)
    };

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

    if (!data || !data.data || !Array.isArray(data.data)) {
        return <h2>No data available</h2>;
    }

    if(role !== "Rector") return null

    return (
        <Flex gap={300}>
            <Card>
                <CardHeader>
                    <Heading size='md'>Student</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {data.data.map((user) => (
                            <Box key={user.id}>
                                <Heading size='xs' textTransform='uppercase'>
                                    {user.email}
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {user.name} {user.surname}  
                                </Text>
                                <Flex gap={10}>
                                    <AddButton onClick={(userId, userType) => handleAddStudent(user.id, userType)} userType="Student"/>
                                    <AddButton onClick={(userId, userType) => handleAddStudent(user.id, userType)} userType="Teacher"/>
                                </Flex>
                            </Box>
                        ))}
                    </Stack>
                </CardBody>
            </Card>
        </Flex>
    );
}

