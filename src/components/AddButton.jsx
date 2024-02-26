import { Button } from '@chakra-ui/react'
import React from 'react'

export default function AddButton({ onClick, userType }) {

  const handleClick = () => {
    onClick(userType);
  };

  return (
        <Button mt={10} display="none" _groupHover={{ display: 'block' }} backgroundColor={"#AEC8CA"} onClick={handleClick}>Add {userType}</Button>
  )
}
