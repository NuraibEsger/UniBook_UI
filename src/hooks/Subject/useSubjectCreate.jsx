// useSubjectCreate.js
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { subjectSchema } from '../../validations/subjectSchema';
import { useMutation, useQueryClient } from 'react-query';
import { postSubject } from '../../services/subjectService';

export default function useSubjectCreate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { token } = useSelector((x) => x.account);
  const queryClient = useQueryClient(); // Access queryClient

  const createSubject = useMutation((values) => postSubject(values, token), {
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
      queryClient.invalidateQueries('Subjects');
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
    validationSchema: subjectSchema,
    onSubmit: (values) => {
      createSubject.mutate(values);
    }
  });

  return { isOpen, onOpen, onClose, formik};
}
