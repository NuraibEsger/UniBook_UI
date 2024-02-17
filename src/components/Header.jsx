import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Container, Flex, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignInModal from './SignInModal'
import { logoutAction } from "../redux/slices/accountSlice";
import RegisterModal from './RegisterModal'
import { useNavigate } from 'react-router-dom'

function Header() {

    const { userName } = useSelector((x) => x.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    mb={8}
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
        <Flex>
            <Stack direction={"row"}>
            <SignInModal />
            {userName ? (
                <Button
                    onClick={() => dispatch(logoutAction())}
                >
                    Log Out
                </Button>
            ):(
               <RegisterModal />
            )}
            </Stack>
        </Flex>
    </Flex>
  )
}

export default Header