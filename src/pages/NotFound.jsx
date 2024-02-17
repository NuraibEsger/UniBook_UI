import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import React from 'react'

export default function NotFound() {
  return (
    <Alert style={{height:"100px", marginTop:"50px"}} status='error'>
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>This page is not defined.</AlertDescription>
    </Alert>
  )
}