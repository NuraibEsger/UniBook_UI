import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import React from 'react'
import { deleteTeacher, getTeachers } from '../services/teacherService';

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

    const handleDeleteTeacher = (userId) => {
        mutation.mutate(userId)
    }

  return (
    <Center>
        <Flex gap={300}>
            <Card>
                <CardHeader>
                    <Heading size='md'>Teacher dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Stack  flexDir="row" flexWrap="wrap" gap={20} divider={<StackDivider />} spacing='4'>
                        {data.data.map((teacher)=>(
                            <Box key={teacher.id}>
                                <Heading justifyContent="center" size='x' textTransform='uppercase'>
                                    {teacher.email}
                                </Heading>
                                <Text pt='2' fontSize='m'>
                                    {teacher.name} {teacher.surname}  
                                </Text>
                                <Button onClick={() => handleDeleteTeacher(teacher.id)} mt={10} colorScheme='red'>Delete student</Button>
                            </Box>
                        ))}
                    </Stack>
                </CardBody>
            </Card>
      </Flex>
    </Center>
  )
}
