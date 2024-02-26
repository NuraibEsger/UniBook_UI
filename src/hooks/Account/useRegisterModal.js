import { useFormik } from 'formik';
import { registerPost } from '../../services/accountService';
import { registerSchema } from '../../validations/registerSchema';
import { useDisclosure, useToast } from '@chakra-ui/react';

function useRegisterModal() {
    const { isOpen, onOpen, onClose: _onClose } = useDisclosure();
    const toast = useToast();

    const formik = useFormik({
        initialValues:{
            name:"",
            surname:"",
            email:"",
            password:"",
            confirmPassword:"",
        },
        onSubmit:(values) =>{
            registerPost(values)
            .then((resp) =>{
                toast({
                    title: "Registered",
                    description:"Please confirm your email",
                    status:"success",
                    duration:3000,
                    isClosable:true,
                    position:"top-right"
                })
                onClose();
                console.log(resp)
            })
            .catch((e) => {
                console.log(e);
            })
            .finally()
        },
        validationSchema: registerSchema
    })

    function onClose() {
        formik.resetForm();
        _onClose();
    }

    return { onOpen, isOpen, onClose, formik };
}

export default useRegisterModal