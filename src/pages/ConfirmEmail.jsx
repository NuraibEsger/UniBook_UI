import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { confirmEmail } from '../services/accountService';

export default function ConfirmEmail() {
    const toast = useToast();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        console.log(token,email);

        confirmEmail(token, email)
            .then(() => {
                toast({
                    title: "Email Confirmed",
                    description: `${email} has been successfully confirmed.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: "Failed to confirm email. Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, [location.search, toast]);

    return (
        <div>ConfirmEmail</div>
    );
}