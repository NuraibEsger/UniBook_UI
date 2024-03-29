import React from 'react';
import { Center, Flex, Heading, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../services/groupService';

export default function GroupDetail() {
    const toast = useToast();
    const { token } = useSelector(x => x.account);
    const { id } = useParams();

    const { isLoading, data, isError, error } = useQuery("GroupDetails", () => {
        return getGroupById(id, token);
    }, {
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
    }

    if (!data || !data.data || data.data.length === 0) {
        return <Center><Heading>No data available</Heading></Center>;
    }

    const group = data.data;

    // Filter userGroups based on UserRole
    const studentGroups = group.userGroups.filter(ug => ug.userRole === "Student");
    const teacherGroups = group.userGroups.filter(ug => ug.userRole === "Teacher");

    return (
        <Center flexDir="column ">
            <Text
                color="#2F8D46"
                fontSize="2rem"
                textAlign="center"
                fontWeight="400"
                my="1rem"
                >
                {group.name}'s group page
            </Text>

            {/* Student Table */}
            <TableContainer justify="center" mx="auto" my="1rem">
                <Table size='lg'>
                    <Thead>
                        <Tr>
                            <Th>Email</Th>
                            <Th>Role</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {studentGroups.map((ug) => (
                            <Tr key={ug.id}>
                                <Td>{ug.user}</Td>
                                <Td>Student</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* Teacher Table */}
            <TableContainer justify="center" mx="auto" my="1rem">
                <Table size='lg'>
                    <Thead>
                        <Tr>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Subject</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {teacherGroups.map((ug) => (
                            <Tr key={ug.id}>
                                <Td>{ug.user}</Td>
                                <Td>Teacher</Td>
                                <Td>{ug.subjectName}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Center>
    );
}
