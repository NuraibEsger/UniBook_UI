import React from 'react';
import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Spinner, Stack, StackDivider, Text, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getExam } from '../services/examService';
import useExamDelete from '../hooks/Exam/useExamDelete';

export default function Exams() {
    const toast = useToast();
    const { id, token, role } = useSelector(x => x.account);
    const { deleteMutation } = useExamDelete();

    const { isLoading, data, isError, error } = useQuery("Exams", () => getExam(id, token), {
        cacheTime: 5000,
    });

    if (isLoading) {
        return <Center><Spinner /></Center>;
    }

    if (isError) {
        toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right"
        });
        return null;
    }

    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
        return <Center><Heading>No data available</Heading></Center>;
    }

    function getMonthName(monthIndex) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[monthIndex];
    }

    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    const handleDeleteExam = (examId) =>{
      deleteMutation.mutate(examId)
  }

    return (
        <Center>
            <Flex mt={20} gap={300} flexWrap="wrap">
                {data.data.map((e) => {
                    const dateObj = new Date(e.dateTime);
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
                                            Group: {e.groupName}
                                        </Heading>
                                        <Text pt='2' fontSize='lg'>
                                            Subject: {e.subjectName}
                                        </Text>
                                        <Text pt='2' fontSize='m'>
                                            Date: {formattedDate}
                                        </Text>
                                        {role === "Teacher" && 
                                        <>
                                            <Flex gap={5} mt={5}>
                                                <Button onClick={() => handleDeleteExam(e.id)} colorScheme='red'>Delete</Button>
                                            </Flex>
                                            <Flex gap={5} mt={5}>
                                                <Button >Update</Button>
                                            </Flex>
                                        </>
                                        }
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    );
                })}
            </Flex>
        </Center>
    );
}
