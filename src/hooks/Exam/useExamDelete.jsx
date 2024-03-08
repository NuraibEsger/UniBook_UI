import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { deleteExam } from '../../services/examService';

export default function useExamDelete() {
    const toast = useToast();
    const { token } = useSelector(x => x.account);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation((examId) => deleteExam(examId, token), {
        onSuccess: () => {
            toast({
                title: "Success Delete",
                description: "Exam was deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
            queryClient.invalidateQueries('Exams');
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
        }
    });

  return {deleteMutation}
}
