import React from 'react';
import { Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner } from '@chakra-ui/react';
import { useQuery, useQueryClient } from 'react-query';
import { getDepartments } from '../../services/departmentService';
import useGroupCreate from '../../hooks/Group/useGroupCreate';

export default function GroupCreate() {
  const { isOpen, onOpen, onClose, formik, seletRef } = useGroupCreate();

  const { data, isLoading, isError, refetch } = useQuery('Departments', getDepartments);

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
      <Button bgColor="#AEC8CA" onClick={onOpen}>
        Create Group
      </Button>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Group name</FormLabel>
              <Input 
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <span style={{ color: "red" }}>{formik.errors.name}</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Department</FormLabel>

              <Select
                ref={seletRef}
                name="departmentId"
                value={formik.values.departmentId}
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
              {formik.errors.departmentId && formik.touched.departmentId && (
                <span style={{ color: "red" }}>{formik.errors.departmentId}</span>
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
