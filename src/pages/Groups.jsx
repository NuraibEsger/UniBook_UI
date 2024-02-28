import React from 'react'
import useUserGroups from '../hooks/Group/useUserGroups'
import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast, } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getUserGroupById } from '../services/userGroupService';
import { useNavigate } from 'react-router-dom';

export default function Groups() {

    const toast = useToast();
  
    const { id, token } = useSelector(x=>x.account);

    const navigate = useNavigate();

    const {isLoading, data, isError, error} = useQuery("Groups", () =>{
        return getUserGroupById( id, token)
    },{
        cacheTime:5000,
    })


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

    const handleViewDetail = (groupId) =>{
        navigate(`/Groups/${groupId}`)
    }

  return (
    <Center>
        <Flex mt={20} gap={300} flexWrap="wrap">
        {data.data.map((ug)=>(
            <Card key={ug.id}>
                <CardHeader>
                    <Heading size='md'>Group dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Stack flexDir="column" flexWrap="wrap" gap={5} divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading justifyContent="center" size='x' textTransform='uppercase'>
                                    Group name
                                </Heading>
                                <Text pt='2' fontSize='m'>
                                    {ug.groupName}
                                </Text>
                            </Box>
                            <Flex gap={5}>
                                <Button onClick={() => handleViewDetail(ug.groupId)} bgColor={"#AEC8CA"}>View Detail</Button>
                            </Flex>
                    </Stack>
                </CardBody>
            </Card>
        ))}
      </Flex>
    </Center>
  )
}
