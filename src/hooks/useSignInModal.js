import { useFormik } from 'formik'
import React from 'react'
import { loginPost } from '../services/accountService'
import { useDispatch } from 'react-redux'
import { loginAction } from '../redux/slices/accountSlice'
import { useDisclosure } from '@chakra-ui/react'
import { loginSchema } from '../validations/loginSchema'

export default function useSignInModal() {

    const { isOpen, onOpen, onClose: _onClose } = useDisclosure();
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            confirmPassword:""
        },
        onSubmit:(values) =>{
            loginPost(values)
                .then((resp) =>{
                    console.log(resp);
                    dispatch(loginAction(resp.data))
                    onClose();
                })
                .catch((e) => {
                    console.log(e);
                })
            },
            validationSchema: loginSchema
        })

        function onClose() {
            formik.resetForm();
            _onClose();
          }

    return { onOpen, isOpen, onClose, formik };
}
