import React from 'react'
import { Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner } from '@chakra-ui/react';
import { getGroup } from '../../services/groupService';
import useAddToGroup from '../../hooks/Group/useAddToGroup';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export default function AddToGroup({userId}) {

  const {token} = useSelector(x=>x.account);

  const { isOpen, onOpen, onClose, formik, seletRef } = useAddToGroup(userId);

  const { data, isLoading, isError } = useQuery('Groups', () => {
    return getGroup(token)
  });

  if(isLoading){
    return <Center><Spinner/></Center>
  }

  if(isError){
      toast({
          title: "Error",
          description: error.message,
          status:"error",
          duration:3000,
          isClosable:true,
          position:"top-right"
      })
  }

  return (
    <>
      <Button  _groupHover={{ display: 'block' }} mt={5} display="none"  bgColor="#AEC8CA" onClick={onOpen}>
        Add Group
      </Button>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Groups</FormLabel>
              <Select
                ref={seletRef}
                name="groupId"
                value={formik.values.groupId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option selected disabled value="default">
                  Select option
                </option>
                {data.data.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.name}
                </option>
                ))}
              </Select>
              {formik.errors.groupId && formik.touched.groupId && (
                <span style={{ color: "red" }}>{formik.errors.groupId}</span>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={formik.handleSubmit} colorScheme="green">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
