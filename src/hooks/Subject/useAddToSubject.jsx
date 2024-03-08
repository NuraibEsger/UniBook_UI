import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { addToSubject } from '../../services/teacherService';
import { useFormik } from 'formik';
import { addToSubjectSchema } from '../../validations/subjectSchema';

export default function useAddToSubject(userId) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { token } = useSelector((x) => x.account);
    const queryClient = useQueryClient();
    const seletRef = useRef();

    const addSubject = useMutation((values) => addToSubject(values, userId, token), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Subject added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right"
          });
          formik.resetForm();
          seletRef.current.value = "default"
          onClose();
          queryClient.invalidateQueries('Teacher');
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right"
          });
        },
      });

      const formik = useFormik({
        initialValues: {
          subjectId: null
        },
        validationSchema: addToSubjectSchema,
        onSubmit: (values) => {
            addSubject.mutate(values);
        }
      });

  return { isOpen, onOpen, onClose, seletRef, formik};
}
