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
 const [email, setEmail] = React.useState('');
 const [password, setPassword] = React.useState('');

 const [isErrorInEmail, setIsErrorInEmail] = React.useState(0);
 const [isErrorInPass, setIsErrorInPass] = React.useState(0);

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

  const handleLoginWithEmail = async () => {
    if (email.length === 0 && password.length === 0) {
      setIsErrorInEmail(1);
      setIsErrorInPass(1);
    } else if (email.length === 0) {
      setIsErrorInEmail(1);
      setIsErrorInPass(0);
    } else if (password.length === 0) {
      setIsErrorInEmail(0);
      setIsErrorInPass(1);
    } else {
      setIsErrorInEmail(0);
      setIsErrorInPass(0);
    }
    let userData = {
      email: email,
      password: password,
    };
    try {
      let res = await fetch('http://localhost:8080/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      let data = await res.json();
      // console.log(data);
      localStorage.setItem('token', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

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
      {show ? (
        <>
          <li onClick={onOpen}>{mainTitle}</li>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              maxH={'1000px'}
              maxW="678px"
              marginTop={'0px'}
              marginBottom="0px"
              textAlign={'center'}
            >
              <ModalCloseButton />
              <ModalBody>
                <ModalHeader
                  letterSpacing={'-0.03em'}
                  lineHeight="32px"
                  fontSize={'28px'}
                  color="rgba(8, 8, 8, 1)"
                  font-family='gt-super, Georgia, Cambria, "Times New Roman", Times, serif'
                  fontWeight={400}
                  margin="50px 0px 50px 0px"
                >
                  Welcome back.
                </ModalHeader>
              </ModalBody>
              <Box>
                <Box margin={'10px'}>
                  <FacebookLogin
                    appId="358532346452010" //APP ID NOT CREATED YET
                    fields="name,email,picture"
                    callback={responseFacebook}
                  />
                </Box>
                <Box margin={'10px'}>
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
                  <Button
                    id="mailButton"
                    value={show}
                    onClick={() => setShow(0)}
                  >
                    <GoMail></GoMail> Sign In with Email
                  </Button>
                </Box>
                <p id="signBtn">
                  No account?
                  {/* <Button
                    color={'rgb(26, 137, 23)'}
                    textDecoration={'none'}
                    background="none"
                    padding={'0px'}
                  >
                    Create One
                  </Button> */}
                  <Register mainTitle="Create One" />
                </p>
              </Box>
              <Box id="termncon">
                Click “Sign In” to agree to Medium’s Terms of Service and
                acknowledge that Medium’s Privacy Policy applies to you.
              </Box>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <>
          <span onClick={onOpen}>{mainTitle}</span>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              maxH={'1000px'}
              maxW="678px"
              marginTop={'0px'}
              marginBottom="0px"
              textAlign={'center'}
            >
              <ModalCloseButton  />
              <ModalBody>
                <ModalHeader
                  letterSpacing={'-0.03em'}
                  lineHeight="32px"
                  fontSize={'28px'}
                  color="rgba(8, 8, 8, 1)"
                  font-family='gt-super, Georgia, Cambria, "Times New Roman", Times, serif'
                  fontWeight={400}
                  margin="50px 0px 50px 0px"
                >
                  Sign in with email
                </ModalHeader>
              </ModalBody>
              <Box padding="0px 40px 50px 40px">
                <Box>
                  <Box>
                    <h4 className="contentBox">
                      Enter the email address associated with your account, and
                      we’ll send a magic link to your inbox.
                    </h4>
                  </Box>
                  <FormControl id="emailBox">
                    <FormLabel id="formLabelStyle">Your Email</FormLabel>
                    <Input
                      type="email"
                      border={'none'}
                      borderBottom="1px"
                      borderRadius={'0px'}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    {isErrorInEmail ? (
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
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    {isErrorInPass ? (
                      <FormHelperText align="center">
                        Password is required.
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage></FormErrorMessage>
                    )}
                  </FormControl>

                  <Stack spacing={4} direction="row" align="center">
                    <Button
                      id="continueBtn"
                      color="white"
                      bg="black"
                      onClick={handleLoginWithEmail}
                    >
                      Continue
                    </Button>
                  </Stack>
                  <Stack spacing={4} direction="row" align="center">
                    <Button
                      id="goBackBtn"
                      value={show}
                      onClick={() => setShow(1)}
                      size="sm"
                    >
                      All sign in options
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export default Login;
