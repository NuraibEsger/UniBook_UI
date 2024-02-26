import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar'
import { Flex, Grid } from '@chakra-ui/react'

export default function Layout() {
  return (
    <Grid>
        <Header />
        <Flex 
            gap={60}
        >
            <SideBar />
            <Outlet />
        </Flex>
    </Grid>
  )
}
