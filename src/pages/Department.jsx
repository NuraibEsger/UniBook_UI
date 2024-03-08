import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { deleteDepartment, getDepartments } from '../services/departmentService';
import DepartmentUpdate from '../components/Department/DepartmentUpdate';

export default function Department() {

    const toast = useToast();

    const {token} = useSelector(x=>x.account);

    const queryClient = useQueryClient();

    const {isLoading, data, isError, error} = useQuery("Departments", () =>{
        return getDepartments(token)

    })

    const deleteMutation = useMutation((departmentId) => deleteDepartment(departmentId, token),{
        onSuccess: () => {
            toast({
                title: "Success Delete",
                description: "Department was deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            }),
            queryClient.invalidateQueries('Departments');
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

    const handleDeleteDepartment = (departmentId) =>{
        deleteMutation.mutate(departmentId)
    }

  return (
    <Center>
        <Flex mt={20} gap={300} flexWrap="wrap">
        {data.data.map((dep)=>(
            <Card key={dep.id}>
                <CardHeader>
                    <Heading size='md'>Department dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Stack flexDir="column" flexWrap="wrap" gap={5} divider={<StackDivider />} spacing='4'>
                            <Box key={dep.id}>
                                <Heading justifyContent="center" size='x' textTransform='uppercase'>
                                    {dep.name}
                                </Heading>
                                <Text pt='2' fontSize='m'>
                                    {dep.description}
                                </Text>
                            </Box>
                            <Flex gap={5}>
                                <Button onClick={() => handleDeleteDepartment(dep.id)} colorScheme='red'>Delete</Button>
                                <DepartmentUpdate departmentId={dep.id} initialValues={{ name: dep.name}} fontWeight={1} bgColor={"#AEC8CA"} />
                            </Flex>
                    </Stack>
                </CardBody>
            </Card>
        ))}
      </Flex>
    </Center>
  )
}
