import React from 'react';
import {
  Modal,
  Button,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Box,
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { gapi } from 'gapi-script';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { GoMail } from 'react-icons/go';
import Register from '../Register/Register';

function Login({ mainTitle }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = React.useState('');
  const [isError, setIsError] = React.useState(0);
  const [show, setShow] = React.useState(1);
  const responseFacebook = response => {
    console.log(response);
  };

  const loginWithFG = async userData => {
    // console.log('called',userData);
    try {
      let res = await fetch('http://localhost:8080/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      let data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const responseGoogle = response => {
    // console.log(response);
    loginWithFG({
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    });
  };
  const handleInputChange = e => setInput(e.target.value);
  const handleLogin = () => {
    console.log(isError);
    if (input.length === 0) {
      setIsError(1);
    } else {
      setIsError(0);
    }
  };
  // const signInWithEmail = () => {};
  React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          '72702126253-gk8cjqhtn4spj35a336earhlej9b3i8d.apps.googleusercontent.com',
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  return (
    <>
      <li onClick={onOpen}>{ mainTitle }</li>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ModalHeader>Welcome Back</ModalHeader>
          </ModalBody>
          {show ? (
            <>
              <Box>
                <Box>
                  <FacebookLogin
                    appId="358532346452010" //APP ID NOT CREATED YET
                    fields="name,email,picture"
                    callback={responseFacebook}
                  />
                </Box>
                <Box>
                  {/* <div className='google-box'> */}
                  <GoogleLogin
                    clientId="72702126253-gk8cjqhtn4spj35a336earhlej9b3i8d.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                    buttonText="Sign In with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                  />
                  {/* </div> */}
                </Box>

                <Box marginBottom={'40px'}>
                  <Button value={show} onClick={() => setShow(0)}>
                    <GoMail></GoMail> Sign In with Email
                  </Button>
                </Box>
                <p>
                  No account?
                  {/* <Button
                    color={'rgb(26, 137, 23)'}
                    textDecoration={'none'}
                    background="none"
                    padding={'0px'}
                  >
                    Create One
                  </Button> */}
                  <Register mainTitle='Create One' />
                </p>
              </Box>
              <Box>
                Click “Sign In” to agree to Medium’s Terms of Service and
                acknowledge that Medium’s Privacy Policy applies to you.
              </Box>
            </>
          ) : (
            <Box padding="0px 40px 50px 40px">
              <Box>
                <h2>Sign in with email</h2>
                <Box>
                  <h4>
                    Enter the email address associated with your account, and
                    we’ll send a magic link to your inbox.
                  </h4>
                </Box>
                <FormControl>
                  <FormLabel>Your Email</FormLabel>
                  <Input
                    type="email"
                    border={'none'}
                    borderBottom="1px"
                    borderRadius={'0px'}
                    value={input}
                    onChange={handleInputChange}
                  />
                  {isError ? (
                    <FormHelperText align="center">
                      Email is required.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage></FormErrorMessage>
                  )}
                  <FormLabel id="formLabelStyle">Password</FormLabel>
                  <Input
                    type="password"
                    border={'none'}
                    borderBottom="1px"
                    borderRadius={'0px'}
                    value={input}
                    onChange={handleInputChange}
                  />
                  {isError ? (
                    <FormHelperText align="center">
                      Password is required.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage></FormErrorMessage>
                  )}
                </FormControl>

                <Stack spacing={4} direction="row" align="center">
                  <Button
                    color="white"
                    bg="black"
                    onClick={handleLogin}
                  >
                    Continue
                  </Button>
                </Stack>
                <Stack spacing={4} direction="row" align="center">
                  <Button
                    value={show}
                    onClick={() => setShow(1)}
                    size="sm"
                  >
                    All sign in options
                  </Button>
                </Stack>
              </Box>
            </Box>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
