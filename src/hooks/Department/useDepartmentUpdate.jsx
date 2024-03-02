import { useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { putDepartment } from '../../services/departmentService';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { departmentSchema } from '../../validations/departmentSchema'

export default function useDepartmentUpdate(departmentId, initialValues) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { token } = useSelector((x) => x.account);
    const queryClient = useQueryClient();

    const updateDepartment = useMutation((values) => putDepartment(departmentId, values, token), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Department updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right"
          });
          queryClient.invalidateQueries('Departments');
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
          name: initialValues.name,
          description: initialValues.description
        },
        validationSchema: departmentSchema,
        onSubmit: (values) => {
          updateDepartment.mutate(values);
        }
      });

    return { isOpen, onOpen, onClose, formik };
}
