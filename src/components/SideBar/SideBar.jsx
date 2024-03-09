import React, { useState } from 'react';
import { FiCalendar, FiHome, FiMenu, FiUser } from 'react-icons/fi';
import { FaBook, FaCubes, FaLayerGroup } from "react-icons/fa";
import { Flex, IconButton } from '@chakra-ui/react';
import NavItem from './NavItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function SideBar() {
    const [navSize, changeNavSize] = useState("large");
    const [activeItem, setActiveItem] = useState("Dashboard"); // Initial active item
    const navigate = useNavigate();
    const { role } = useSelector(x => x.account)

    const handleItemClick = (title, route) => {
        setActiveItem(title);
        navigate(route);
    };

    return (
        <Flex
            pos="sticky"
            left="5"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize === "small" ? "15px" : "30px"}
            w={navSize === "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex p="5" flexDir="column" alignItems="center" as="nav">
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        changeNavSize(prevSize => (prevSize === "small" ? "large" : "small"));
                    }}
                />
                <NavItem
                    navSize={navSize}
                    icon={FiHome}
                    title="Home"
                    active={activeItem === "Home"}
                    onClick={() => handleItemClick("Home", "/")}
                />
                {role === "Teacher" &&
                    (
                        <NavItem
                            navSize={navSize}
                            icon={FiCalendar}
                            title="Exams"
                            active={activeItem === "Exams"}
                            onClick={() => handleItemClick("Exams", "Exams")}
                        />
                    )}
                {role === "Student" &&
                    (
                        <NavItem
                            navSize={navSize}
                            icon={FiCalendar}
                            title="Exams"
                            active={activeItem === "Exams"}
                            onClick={() => handleItemClick("Exams", "Exams")}
                        />
                    )}
                {role === "Rector" && (
                    <NavItem
                        navSize={navSize}
                        icon={FaCubes}
                        title="Departments"
                        active={activeItem === "Departments"}
                        onClick={() => handleItemClick("Departments", "Departments")}
                    />
                )}
                {role === "Rector" && (
                    <NavItem
                        navSize={navSize}
                        icon={FaLayerGroup}
                        title="All Groups"
                        active={activeItem === "All Groups"}
                        onClick={() => handleItemClick("All Groups", "AdminGroups")}
                    />
                )}
                {role === "Rector" && (
                    <NavItem
                        navSize={navSize}
                        icon={FaBook}
                        title="Subjects"
                        active={activeItem === "Subjects"}
                        onClick={() => handleItemClick("Subjects", "Subjects")}
                    />
                )}
                {role === "Rector" && (
                    <NavItem
                        navSize={navSize}
                        icon={FiUser}
                        title="Users"
                        active={activeItem === "Users"}
                        onClick={() => handleItemClick("Users", "Users")}
                    />
                )}
                {role === "Rector" && (
                    <NavItem
                        navSize={navSize}
                        icon={FiUser}
                        title="Students"
                        active={activeItem === "Students"}
                        onClick={() => handleItemClick("Students", "Students")}
                    />
                )}
                {role === "Rector" && (
                    <NavItem
                        navSize={navSize}
                        icon={FiUser}
                        title="Teachers"
                        active={activeItem === "Teachers"}
                        onClick={() => handleItemClick("Teachers", "Teachers")}
                    />
                )}
                {role === "Teacher" && (
                    <NavItem
                        navSize={navSize}
                        icon={FiUser}
                        title="Groups"
                        active={activeItem === "Groups"}
                        onClick={() => handleItemClick("Groups", "Groups")}
                    />
                )}

                {role === "Student" && (
                    <NavItem
                        navSize={navSize}
                        icon={FiUser}
                        title="Groups"
                        active={activeItem === "Groups"}
                        onClick={() => handleItemClick("Groups", "Groups")}
                    />
                )}
            </Flex>
            <Flex p="5%" flexDir="column" w="100%" alignItems={navSize === "small" ? "center" : "flex-start"} mb={4}>
            </Flex>
        </Flex>
    );
}

export default SideBar;
