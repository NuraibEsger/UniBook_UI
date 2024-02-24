import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery } from 'react-query';
import { deleteStudents, getStudents } from '../services/studentService';
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

    const deleteStudent = (userId) => {
        mutation.mutate(userId)
    }

  return (
    <Center>
        <Flex gap={300}>
            <Card>
                <CardHeader>
                    <Heading size='md'>Student dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Stack  flexDir="row" flexWrap="wrap" gap={20} divider={<StackDivider />} spacing='4'>
                        {data.data.map((student)=>(
                            <Box key={student.id}>
                                <Heading justifyContent="center" size='x' textTransform='uppercase'>
                                    {student.email}
                                </Heading>
                                <Text pt='2' fontSize='m'>
                                    {student.name} {student.surname}  
                                </Text>
                                <Button onClick={() => deleteStudent(student.id)} mt={10} colorScheme='red'>Delete student</Button>
                            </Box>
                        ))}
                    </Stack>
                </CardBody>
            </Card>
      </Flex>
    </Center>
  )
}
