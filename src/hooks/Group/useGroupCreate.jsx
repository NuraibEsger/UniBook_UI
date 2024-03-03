import { useDisclosure, useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { postGroup } from '../../services/groupService';
import { useFormik } from 'formik';
import { groupSchema } from '../../validations/groupSchema';
import { useRef } from 'react';

export default function useGroupCreate() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { token } = useSelector((x) => x.account);
    const queryClient = useQueryClient();

    const seletRef = useRef();

    const createGroup = useMutation((values) => postGroup(values, token), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Group created successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right"
          });
          formik.resetForm();
          seletRef.current.value = "default"
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
          departmentId: null
        },
        validationSchema: groupSchema,
        onSubmit: (values) => {
          createGroup.mutate(values);
        }
      });

      return { isOpen, onOpen, onClose, formik, seletRef, token};
}
