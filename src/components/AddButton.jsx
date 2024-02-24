import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

export default function AddButton({ onClick, userType }) {

  const handleClick = () => {
    onClick(userType);
  };

  return (
        <Button display="none" _groupHover={{ display: 'block' }} backgroundColor={"#AEC8CA"} onClick={handleClick}>Add {userType}</Button>
  )
}
