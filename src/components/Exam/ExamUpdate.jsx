import React from 'react';
import { Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getUserGroupById } from '../../services/userGroupService';
import { useSelector } from 'react-redux';
import useExamUpdate from '../../hooks/Exam/useExamUpdate';

export default function ExamUpdate({ examId, initialValues }) {
  
  const {id , token} = useSelector(x=>x.account);

  const {isLoading, data, isError, error} = useQuery("UserGroups", () =>{
    return getUserGroupById( id, token)
  })

  const toast = useToast();

  const { isOpen, onOpen, onClose, formik, seletRef } = useExamUpdate( examId, initialValues );


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
        Update Exam
      </Button>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Exam</ModalHeader>
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
                      {x.groupName}
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
