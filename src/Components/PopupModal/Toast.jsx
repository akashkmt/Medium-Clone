import { useToast } from '@chakra-ui/react'

function Toast({type}) {
    const toast = useToast();
    if(type == 'accountCreated'){
        return (
            toast({
                title: 'Account created.',
                  description: "We've created your account for you.",
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
            })
          )
    }
    if(type == 'accountExists'){
        return (
            toast({
                title: 'Account exists.',
                  description: "You already have an account. Please log in.",
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
            })
          )
    }
    if(type == 'loginFailedPass'){
        return (
            toast({
                title: 'Login failed.',
                  description: "Your password is incorrect.",
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
            })
          )
    }
    if(type == 'loginFailed'){
        return (
            toast({
                title: 'Login failed.',
                  description: "User does not exist. Please sign up.",
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
            })
          )
    }
    if(type == 'loginSuccess'){
        return (
            toast({
                title: 'Login successful.',
                  description: "You are now logged in.",
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
            })
          )
    }
  
}

export default Toast