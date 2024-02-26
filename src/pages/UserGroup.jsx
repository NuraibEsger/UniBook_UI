import React from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getUserGroupById } from '../services/userGroupService';
import { Card, Center, Heading, Spinner, useToast } from '@chakra-ui/react';

export default function UserGroup() {

    const {token} = useSelector(x=>x.account);

    const {id} = useParams()

    const toast = useToast();

    const {isLoading, data, isError, error} = useQuery("UserGroups",() =>{
        return getUserGroupById(id,token)

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

    if (!data || !data.data || data.data.length == 0) {
        return <Center><Heading>No data available</Heading></Center>
    }

    const userGroup = data.data;

  return (
        <Center>
            <Card>
                <Heading>User Group Details</Heading>
                <Heading as="h3" size="md">User: {userGroup.user}</Heading>
                <Heading as="h3" size="md">Group Name: {userGroup.groupName}</Heading>
                {/* Add more fields as needed */}
            </Card>
        </Center>
  )
}
