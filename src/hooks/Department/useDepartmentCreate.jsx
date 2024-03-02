import { useDisclosure, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { postDepartment } from '../../services/departmentService';
import { useFormik } from 'formik';
import { departmentSchema } from '../../validations/departmentSchema';

export default function useDepartmentCreate() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { token } = useSelector((x) => x.account);
    const queryClient = useQueryClient(); // Access queryClient

    const createDepartment = useMutation((values) => postDepartment(values, token), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Subject created successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right"
          });
          formik.resetForm();
          onClose();
          queryClient.invalidateQueries('Departments');
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
          name: "",
          description: ""
        },
        validationSchema: departmentSchema,
        onSubmit: (values) => {
          createDepartment.mutate(values);
        }
      });

      return { isOpen, onOpen, onClose, formik};
}
