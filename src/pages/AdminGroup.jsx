import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { deleteGroup, getGroup } from '../services/groupService';
import GroupUpdate from '../components/Group/GroupUpdate';
import { useNavigate } from 'react-router-dom';

export default function AdminGroup() {

  const toast = useToast();

  const navigate = useNavigate()

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

  const handleDeleteGroup = (groupId) =>{
      deleteMutation.mutate(groupId)
  }

  const handleViewDetail = (groupId) =>{
    navigate(`/Groups/${groupId}`)
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
                                    Group'name: {group.name}
                                </Heading>
                                <Text pt='2' fontSize='m'>
                                    Department's name: {group.departmentName}
                                </Text>
                            </Box>
                            <Flex gap={5}>
                                <Button onClick={() => handleDeleteGroup(group.id)} colorScheme='red'>Delete</Button>
                                <GroupUpdate groupId={group.id} initialValues={{name: group.name , departmentId: group.departmentId}} fontWeight={1} bgColor={"#AEC8CA"}/>
                            <Flex gap={5}>
                                <Button onClick={() => handleViewDetail(group.id)} bgColor={"#AEC8CA"}>View Detail</Button>
                            </Flex>
                            </Flex>
                    </Stack>
                </CardBody>
            </Card>
        ))}
      </Flex>
    </Center>
  )
}
