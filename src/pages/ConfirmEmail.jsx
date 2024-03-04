import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { confirmEmail } from '../services/accountService';
import { Button, useToast } from '@chakra-ui/react';

function EmailConfirmationComponent() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token').replace(/ /g, '+');
  const email = searchParams.get('email');
  const toast = useToast()

  useEffect(() => {
  }, [token, email]);


  const handleConfirmEmail = useMutation((data) => confirmEmail(data), {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Email confirmed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
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

  return (
    <div>
        <Button onClick={() => handleConfirmEmail.mutate({ email, token })} mt={10} backgroundColor={"#AEC8CA"}>Confirm Email</Button>
    </div>
  );
}

export default EmailConfirmationComponent;
