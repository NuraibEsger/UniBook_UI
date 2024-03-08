import { useDisclosure, useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { postExam } from '../../services/examService';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { examSchema } from '../../validations/examSchema';

export default function useExamCreate() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const {id, token } = useSelector((x) => x.account);
    const queryClient = useQueryClient();
    const seletRef = useRef();

    const createExam = useMutation((values) => postExam(id, values, token), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Exam created successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right"
          });
          formik.resetForm();
          seletRef.current.value = "default"
          onClose();
          queryClient.invalidateQueries('UserGroups');
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
          dateTime: "",
          groupId: null
        },
        validationSchema: examSchema,
        onSubmit: (values) => {
            createExam.mutate(values);
        }
      });

      return { isOpen, onOpen, onClose, formik, seletRef, token};
}
