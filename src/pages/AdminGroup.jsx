import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { deleteGroup, getGroup } from '../services/groupService';

export default function AdminGroup() {

  const toast = useToast();

  const {token} = useSelector(x=>x.account);

  const queryClient = useQueryClient();

  const {isLoading, data, isError, error} = useQuery("Groups", () =>{
      return getGroup(token)

  },{
      cacheTime:5000,
  })

  const deleteMutation = useMutation((groupId) => deleteGroup(groupId, token),{
      onSuccess: () => {
          toast({
              title: "Success Delete",
              description: "Deleted Group",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top-right"
          }),
          queryClient.invalidateQueries('Groups');
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

  const handleDeleteGroup = (groupId) =>{
      deleteMutation.mutate(groupId)
  }

  return (
    <Center>
        <Flex mt={20} gap={300} flexWrap="wrap">
        {data.data.map((group)=>(
            <Card key={group.id}>
                <CardHeader>
                    <Heading size='md'>Group dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Stack flexDir="column" flexWrap="wrap" gap={5} divider={<StackDivider />} spacing='4'>
                            <Box key={group.id}>
                                <Heading justifyContent="center" size='x' textTransform='uppercase'>
                                    {group.name}
                                </Heading>
                                <Text pt='2' fontSize='m'>
                                    {group.departmentName}
                                </Text>
                            </Box>
                            <Flex gap={5}>
                                <Button onClick={() => handleDeleteGroup(group.id)} colorScheme='red'>Delete</Button>
                            </Flex>
                    </Stack>
                </CardBody>
            </Card>
        ))}
      </Flex>
    </Center>
  )
}
