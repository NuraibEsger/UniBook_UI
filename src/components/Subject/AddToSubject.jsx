import React from 'react'
import { Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner } from '@chakra-ui/react';
import useAddToSubject from '../../hooks/Subject/useAddToSubject'
import { useQuery } from 'react-query';
import { getSubjects } from '../../services/subjectService';

export default function AddToSubject({userId}) {

    const { isOpen, onOpen, onClose, seletRef, formik} = useAddToSubject(userId);

    const { data, isLoading, isError } = useQuery('Subjects', getSubjects);

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
      <Button  _groupHover={{ display: 'block' }} mt={5} display="none" bgColor="#AEC8CA" onClick={onOpen}>
        Add Subject
      </Button>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Subject</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Subject</FormLabel>

              <Select
                ref={seletRef}
                name="subjectId"
                value={formik.values.subjectId}
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
              {formik.errors.subjectId && formik.touched.subjectId && (
                <span style={{ color: "red" }}>{formik.errors.subjectId}</span>
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
