import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar/SideBar'
import { Flex } from '@chakra-ui/react'

export default function Layout() {
  return (
    <>
        <Header />
        <Flex 
            flexDir="row"
            gap={20}
        >
            <SideBar />
            <Outlet />
        </Flex>
        <Footer />
    </>
  )
}
