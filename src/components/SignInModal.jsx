import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import useSignInModal from '../hooks/useSignInModal'
import { useSelector } from 'react-redux';

function SignInModal() {
    const { onOpen, onClose, formik, isOpen } = useSignInModal();
    const {userName} = useSelector(state => state.account);

  return (
    <>
       {userName ? (
         <></>
      ):(
        <Button style={{color:"white"}} onClick={onOpen} variant={"link"}>
          Sign In
        </Button>
      )}

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

export default SignInModal