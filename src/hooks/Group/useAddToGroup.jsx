import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { postUserGroup } from '../../services/userGroupService';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { addToGroupSchema } from '../../validations/groupSchema';

export default function useAddToGroup(userId) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { token } = useSelector((x) => x.account);
    const queryClient = useQueryClient();
    const seletRef = useRef();


    const addToGroupMutation = useMutation((values) => postUserGroup(values, token),{
        onSuccess:() => {
            toast({
                title: "Success added to group",
                description: "Added to group",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
            formik.resetForm();
            seletRef.current.value = "default"
            onClose();
            queryClient.invalidateQueries('Groups');
            queryClient.invalidateQueries('Students')
            queryClient.invalidateQueries('Teachers');

        },
        onError:(error) =>{
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        },
    })

    const formik = useFormik({
        initialValues: {
          groupId: null
        },
        validationSchema: addToGroupSchema,
        onSubmit: (values) => {
          addToGroupMutation.mutate({userId, ...values});
        }
      });
      
  return { isOpen, onOpen, onClose, formik, seletRef, token }
}
