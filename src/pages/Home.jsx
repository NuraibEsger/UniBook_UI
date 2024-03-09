import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function Home() {
  return (
    <>
      <Card maxW='md'>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name='Nuraib Esger' textColor="white" bgColor="green" src='https://bit.ly/broken-link' />

              <Box>
                <Heading size='sm'>Segun Adebayo</Heading>
                <Text>Rector</Text>
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Heading>Xəbərlər</Heading>
        <Text>
          Azərbaycan Dövlət Neft və Sənaye Universitetinin (ADNSU) rektoru, 
          professor Nuraib Əsgərin sədrliyi ilə Elmi Şuranın ilk iclası keçirilib. 
          İclasda universitetin fəaliyyət məsələlərilə yanaşı, görkəmli alim, akademik Azad Mirzəcanzadənin adına təqaüdün təsis edilməsi haqqında qərar qəbul edilib. 
          Qərara əsasən universitetdə “Azad Mirzəcanzadə adına təqaüd” təsis edilib. 
          Təqaüd ali təhsil ocağında yaradılmış komissiyanın qərarı ilə hər tədris ilində A.Mirzəcanzadənin işlədiyi elm sferasına uyğun olan fakültələr üzrə ən yüksək təhsil səviyyəsi olan, 
          elmi-təcrübi biliklərə, dünyagörüşünə, davamiyyəti və davranışı ilə fərqlənən üç tələbəyə veriləcək.....
        </Text>
        </CardBody>
        <Image
        objectFit='cover'
        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Chakra UI'
        />
    </Card>

    <Card maxW='md'>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name='Nuraib Esger' textColor="white" bgColor="green" src='https://bit.ly/broken-link' />

              <Box>
                <Heading size='sm'>Segun Adebayo</Heading>
                <Text>Rector</Text>
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Heading size='sm'>Xəbərlər</Heading>
        <Text size='sm'>
          Azərbaycan Dövlət Neft və Sənaye Universitetinin (ADNSU) rektoru, 
          professor Nuraib Əsgərin sədrliyi ilə Elmi Şuranın ilk iclası keçirilib. 
          İclasda universitetin fəaliyyət məsələlərilə yanaşı, görkəmli alim, akademik Azad Mirzəcanzadənin adına təqaüdün təsis edilməsi haqqında qərar qəbul edilib. 
          Qərara əsasən universitetdə “Azad Mirzəcanzadə adına təqaüd” təsis edilib. 
          Təqaüd ali təhsil ocağında yaradılmış komissiyanın qərarı ilə hər tədris ilində A.Mirzəcanzadənin işlədiyi elm sferasına uyğun olan fakültələr üzrə ən yüksək təhsil səviyyəsi olan, 
          elmi-təcrübi biliklərə, dünyagörüşünə, davamiyyəti və davranışı ilə fərqlənən üç tələbəyə veriləcək.....
        </Text>
        </CardBody>
        <Image
        objectFit='cover'
        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Chakra UI'
        />
    </Card>
    </>
  )
}
