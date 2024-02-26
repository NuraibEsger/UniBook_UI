import { Box, Button, Card, CardBody, CardHeader, Center, Divider, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteSubject, getSubjects } from '../services/subjectService'
import { useSelector } from 'react-redux'
import SubjectUpdate from '../components/SubjectUpdate'

export default function Subjects() {

    const toast = useToast();

    const {token} = useSelector(x=>x.account);

    const queryClient = useQueryClient();

    const {isLoading, data, isError, error} = useQuery("Subjects", () =>{
        return getSubjects(token)

    },{
        cacheTime:5000,
    })

    const deleteMutation = useMutation((subjectId) => deleteSubject(subjectId, token),{
        onSuccess: () => {
            toast({
                title: "Success Delete",
                description: "Changed role",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            }),
            queryClient.invalidateQueries('Subjects');
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

    const handleDeleteSubject = (userId) =>{
        deleteMutation.mutate(userId)
    }

  return (
    <Center>
        <Flex mt={20} gap={300} flexWrap="wrap">
        {data.data.map((sbj)=>(
            <Card key={sbj.id}>
                <CardHeader>
                    <Heading size='md'>Subject dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Stack flexDir="column" flexWrap="wrap" gap={5} divider={<StackDivider />} spacing='4'>
                            <Box key={sbj.id}>
                                <Heading justifyContent="center" size='x' textTransform='uppercase'>
                                    {sbj.name}
                                </Heading>
                                <Text pt='2' fontSize='m'>
                                    {sbj.description}
                                </Text>
                            </Box>
                            <Flex gap={5}>
                                <Button onClick={() => handleDeleteSubject(sbj.id)} colorScheme='red'>Delete</Button>
                                <SubjectUpdate subjectId={sbj.id} initialValues={{ name: sbj.name, description: sbj.description }} fontWeight={1} bgColor={"#AEC8CA"} />
                            </Flex>
                            
                    </Stack>
                </CardBody>
            </Card>
        ))}
      </Flex>
    </Center>
  )
}
