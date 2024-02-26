import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import useRegisterModal from '../hooks/Account/useRegisterModal';

function RegisterModal() {

    const { onOpen, isOpen, onClose, formik } = useRegisterModal();

  return (

    <>
        <Button style={{color:"white"}} onClick={onOpen} variant={"link"}>
            Sign Up
        </Button>
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input 
              name="name" 
              placeholder='Name' 
              onChange={formik.handleChange}
              value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <span style={{ color: "red" }}>{formik.errors.name}</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Surname</FormLabel>
              <Input 
              name="surname" 
              placeholder='Surname' 
              onChange={formik.handleChange}
              value={formik.values.surname}
              />
              {formik.errors.surname && formik.touched.surname && (
                <span style={{ color: "red" }}>{formik.errors.surname}</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input 
              name="email" 
              placeholder='Email' 
              onChange={formik.handleChange}
              value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input 
              type='password' 
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <span style={{ color: "red" }}>{formik.errors.password}</span>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input 
              type='password' 
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <span style={{ color: "red" }}>{formik.errors.confirmPassword}</span>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={formik.handleSubmit} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

    
  )
}

export default RegisterModal