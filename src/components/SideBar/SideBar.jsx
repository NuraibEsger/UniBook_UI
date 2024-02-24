import React, { useState } from 'react';
import { FiCalendar, FiFile, FiFileText, FiHome, FiMenu, FiUser } from 'react-icons/fi';
import { Flex, IconButton, Divider } from '@chakra-ui/react';
import NavItem from './NavItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function SideBar() {
    const [navSize, changeNavSize] = useState("large");
    const [activeItem, setActiveItem] = useState("Dashboard"); // Initial active item
    const navigate = useNavigate();
    const {role} = useSelector(x=>x.account)

    const handleItemClick = (title, route) => {
        setActiveItem(title);
        navigate(route);
    };

    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
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
                    title="Dashboard"
                    active={activeItem === "Dashboard"}
                    onClick={() => handleItemClick("Dashboard", "/")}
                />
                <NavItem
                    navSize={navSize}
                    icon={FiCalendar}
                    title="Calendar"
                    active={activeItem === "Calendar"}
                    onClick={() => handleItemClick("Calendar", "Calendar")}
                />
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
            </Flex>

            <Flex p="5%" flexDir="column" w="100%" alignItems={navSize === "small" ? "center" : "flex-start"} mb={4}>
            </Flex>
            <Divider display={navSize === "small" ? "none" : "flex"} />
            <Flex></Flex>
        </Flex>
    );
}

export default SideBar;