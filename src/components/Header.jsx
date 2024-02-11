import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import SignInModal from './SignInModal'

function Header() {

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
            <Stack direction={"row"}>
                <SignInModal />
                <Button>
                    Log Out
                </Button>
            </Stack>
        </Flex>
    </Flex>
  )
}

export default Header