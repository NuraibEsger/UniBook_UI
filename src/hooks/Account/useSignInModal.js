import { useFormik } from 'formik'
import React from 'react'
import { loginPost } from '../../services/accountService'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../redux/slices/accountSlice'
import { useDisclosure } from '@chakra-ui/react'
import { loginSchema } from '../../validations/loginSchema'
import { jwtDecode } from 'jwt-decode'

export default function useSignInModal() {

    const { isOpen, onOpen, onClose: _onClose } = useDisclosure();
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            confirmPassword:""
        },
        onSubmit:(values) => {
            loginPost(values)
                .then((resp) => {
                    const token = resp.data;
                    const decoded = jwtDecode(token);
                    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
                    const userName = decoded.UserName
                    dispatch(loginAction({ token, userName, role }))
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