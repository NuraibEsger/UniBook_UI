import { Avatar, Button, Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import React from 'react'
import { SettingsIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux'
import SignInModal from './Account/SignInModal'
import { logoutAction } from "../redux/slices/accountSlice";
import RegisterModal from './Account/RegisterModal'
import { useNavigate } from 'react-router-dom'
import SubjectCreate from './Subject/SubjectCreate';
import DepartmentCreate from './Department/DepartmentCreate';
import GroupCreate from './Group/GroupCreate';
import ExamCreate from './Exam/ExamCreate';

function Header() {

    const { userName, role ,token } = useSelector((x) => x.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    p={8}
    bgColor={"Black"}
    color={["white", "white", "primary.700", "primary.700"]}
    >
        <Flex>
            <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                    <Tab onClick={() => navigate("/")}>Home</Tab>
                </TabList>
            </Tabs>
        </Flex>
        <Flex gap={5} alignItems={'center'}>
                {role === 'Rector' && <DepartmentCreate />}
                {role === 'Rector' && <GroupCreate />}
                {role === 'Rector' && <SubjectCreate />}
                {role === 'Teacher' && <ExamCreate />}
                <SignInModal />
                {userName ? (
                    <Menu>
                    
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem cursor={"default"}>{userName}</MenuItem>
                    <MenuItem onClick={() => navigate("/Settings")}>
                    <Icon as={SettingsIcon} mr={2} /> Settings
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => dispatch(logoutAction())}>
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
            ):(
                <RegisterModal />
            )}
            
          </Flex>
    </Flex>
  )
}

export default Header