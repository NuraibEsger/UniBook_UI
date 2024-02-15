import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignInModal from './SignInModal'
import { logoutAction } from "../redux/slices/accountSlice";

function Header() {

    const { userName } = useSelector((x) => x.account);
    const dispatch = useDispatch();

  return (
    <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    mb={8}
    p={8}
    bg={["primary.500", "primary.500", "transparent", "transparent"]}
    color={["white", "white", "primary.700", "primary.700"]}
    >
        <Flex>
            <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                    <Tab>Home</Tab>
                </TabList>
            </Tabs>
        </Flex>
        <Flex>
            
            <SignInModal />
            <Stack direction={"row"}>
            {userName ? (
                <Button
                    onClick={() => dispatch(logoutAction())}
                >
                    Log Out
                </Button>
            ):(
               <Button>Sign Up</Button> 
            )}
            </Stack>
            
        </Flex>
    </Flex>
  )
}

export default Header