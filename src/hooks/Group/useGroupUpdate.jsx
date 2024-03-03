import { Center, Heading, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { getUserGroupById } from '../../services/userGroupService';
import { useRef } from 'react';
import { putGroup } from '../../services/groupService';
import { useFormik } from 'formik';
import { groupSchema } from '../../validations/groupSchema';

export default function useGroupUpdate(groupId, initialValues) {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { token } = useSelector((x) => x.account);
    const queryClient = useQueryClient();
    const seletRef = useRef();

    const updateGroup = useMutation((values) => putGroup(groupId, values, token), {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Group created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
        queryClient.invalidateQueries('Groups');
        queryClient.invalidateQueries('Departments');
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
        name: initialValues.name,
        departmentId: initialValues.departmentId
      },
      validationSchema: groupSchema,
      onSubmit: (values) => {
        updateGroup.mutate(values);
      }
    });

    return { isOpen, onOpen, onClose, formik, seletRef};
}
