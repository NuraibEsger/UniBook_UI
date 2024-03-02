import React from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import useDepartmentCreate from '../hooks/Department/useDepartmentCreate';

export default function DepartmentCreate() {

  const { isOpen, onOpen, onClose, formik } = useDepartmentCreate();

  return (
    <>
      <Button bgColor="#AEC8CA" onClick={onOpen}>
        Create Department
      </Button>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Department</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Department name</FormLabel>
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
  )
}
