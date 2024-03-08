import React from 'react';
import { Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import useExamCreate from '../../hooks/Exam/useExamCreate';
import { getGroup } from '../../services/groupService';
import { useSelector } from 'react-redux';

export default function ExamCreate() {

  const { isOpen, onOpen, onClose, formik, seletRef } = useExamCreate();

  const { data, isLoading, isError } = useQuery('Groups', getGroup);

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
        Create Exam
      </Button>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Exam</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Exam Date</FormLabel>
              <Input 
                name='dateTime'
                type="datetime-local"
                value={formik.values.dateTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.dateTime && formik.touched.dateTime && (
                <span style={{ color: "red" }}>{formik.errors.dateTime}</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Group</FormLabel>

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
