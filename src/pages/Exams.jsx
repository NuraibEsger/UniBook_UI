import React from 'react'
import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast, } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getExam } from '../services/examService';

export default function Exams() {

    const toast = useToast();
  
    const { id, token } = useSelector(x=>x.account);

    const navigate = useNavigate();

    const {isLoading, data, isError, error} = useQuery("Exams", () =>{
        return getExam( id, token)
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

    const handleViewDetail = (examId) =>{
        navigate(`/Exams/${examId}`)
    }

    function getMonthName(monthIndex) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[monthIndex];
      }
      
      // Function to pad zero to single-digit numbers
      function padZero(num) {
        return num.toString().padStart(2, '0');
      }

  return (
    <Center>
        <Flex mt={20} gap={300} flexWrap="wrap">
        {data.data.map((e) => {
  // Parse the dateTime string into a Date object
  const dateObj = new Date(e.dateTime);

  // Format the date in the desired format
  const formattedDate = `${dateObj.getDate()} ${getMonthName(dateObj.getMonth())} ${dateObj.getFullYear()} ${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}`;

  return (
    <Card key={e.id}>
      <CardHeader>
        <Heading size='md'>Exam dashboard</Heading>
      </CardHeader>
      <CardBody>
        <Stack flexDir="column" flexWrap="wrap" gap={5} divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading justifyContent="center" size='x' textTransform='uppercase'>
              {e.groupName}
            </Heading>
            <Text pt='2' fontSize='m'>
              {formattedDate}
            </Text>
          </Box>
          <Flex gap={5}>
            <Button onClick={() => handleViewDetail(ug.examId)} bgColor={"#AEC8CA"}>View Detail</Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
})}
      </Flex>
    </Center>
  )
}
