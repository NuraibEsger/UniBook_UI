// useSubjectUpdate.js
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { subjectSchema } from '../../validations/subjectSchema';
import { useMutation, useQueryClient } from 'react-query';
import { putSubject } from '../../services/subjectService'; // Import the putSubject service function

export default function useSubjectUpdate(subjectId, initialValues) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { token } = useSelector((x) => x.account);
  const queryClient = useQueryClient();

  const updateSubject = useMutation((values) => putSubject(subjectId, values, token), {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Subject updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      queryClient.invalidateQueries('Subjects');
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
    validationSchema: subjectSchema,
    onSubmit: (values) => {
      // Assuming subjectId is passed as a prop or retrieved from somewhere
      updateSubject.mutate(values);
    }
  });

  return { isOpen, onOpen, onClose, formik };
}
