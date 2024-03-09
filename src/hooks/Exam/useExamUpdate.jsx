import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { putExam } from '../../services/examService';
import { examSchema } from '../../validations/examSchema';
import { useFormik } from 'formik';

export default function useExamUpdate(examId, initialValues) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { id, token } = useSelector((x) => x.account);
    const queryClient = useQueryClient();
    const seletRef = useRef();

    const updateExam = useMutation((values) => putExam(id, {examId, ...values}, token), {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Exam updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
        queryClient.invalidateQueries('Exams');
        seletRef.current.value = "default"
        onClose();
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
        groupId: initialValues.groupId,
        dateTime: initialValues.dateTime
      },
      validationSchema: examSchema,
      onSubmit: (values) => {
        updateExam.mutate(values);
      }
    });

    return { isOpen, onOpen, onClose, formik, seletRef};
}
