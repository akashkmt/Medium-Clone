import React from 'react';
import './PopupModal.css';
import { PopupContext } from '../../Context/PopupContext';
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
import { FaFacebook } from 'react-icons/fa';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';


function PopupModal({ mainTitle }) {
  const [accountCreated, setAccountCreated] = React.useState(false);
  const [accountExists, setAccountExists] = React.useState(false);
  const [loginFailedPass, setLoginFailedPass] = React.useState(false);
  const [loginFailed, setLoginFailed] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { popup, setPopup } = React.useContext(PopupContext);
  const navigate = useNavigate();
  //login States
  const [emailLogin, setEmailLogin] = React.useState('');
  const [passwordLogin, setPasswordLogin] = React.useState('');
  const [isErrorInEmailLogin, setIsErrorInEmailLogin] = React.useState(0);
  const [isErrorInPassLogin, setIsErrorInPassLogin] = React.useState(0);
  const [showLogin, setShowLogin] = React.useState(1);

  //signup States
  const [registerName, setRegisterName] = React.useState('');
  const [registerEmail, setRegisterEmail] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [isErrorInNameRegister, setIsErrorInNameRegister] = React.useState(0);
  const [isErrorInEmailRegister, setIsErrorInEmailRegister] = React.useState(0);
  const [isErrorInPassRegister, setIsErrorInPassRegister] = React.useState(0);
  const [showRegister, setShowRegister] = React.useState(1);

  
  //login function
  const responseFacebookLogin = response => {
    console.log(response);
  };

  const loginWithFG = async userData => {
    // console.log('called',userData);
    try {
      let res = await fetch('https://medium-web-app-backend.herokuapp.com/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      let data = await res.json();
      // console.log(data);
      if(data.message == 'User does not exist'){
        setLoginFailed(true);
        setAccountExists(false);
        setAccountCreated(false);
        setLoginFailedPass(false);
        setLoginSuccess(false);
        setTimeout(() => {
          setLoginFailed(false);
        }
        , 3000);

      }
      else if(data.message == 'Incorrect password'){
        setLoginFailed(false);
        setAccountExists(false);
        setAccountCreated(false);
        setLoginFailedPass(true);
        setLoginSuccess(false);
        setTimeout(() => {
          setLoginFailedPass(false);
        }
        , 3000);
      }
      else{
        localStorage.setItem('token', data.token);
        setLoginSuccess(true);
        setLoginFailed(false);
        setAccountExists(false);
        setAccountCreated(false);
        setLoginFailedPass(false);
        setTimeout(() => {
          setLoginSuccess(false);
          navigate('/homepage');
        }
        , 3000);

      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const responseGoogleLogin = response => {
    console.log(response);
    loginWithFG({
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    });
  };

  const handleLoginWithEmail = async () => {
    if (emailLogin.length === 0 && passwordLogin.length === 0) {
      setIsErrorInEmailLogin(1);
      setIsErrorInPassLogin(1);
      return;
    } else if (emailLogin.length === 0) {
      setIsErrorInEmailLogin(1);
      setIsErrorInPassLogin(0);
      return;
    } else if (passwordLogin.length === 0) {
      setIsErrorInEmailLogin(0);
      setIsErrorInPassLogin(1);
      return;
    } else {
      setIsErrorInEmailLogin(0);
      setIsErrorInPassLogin(0);
    }
    let userData = {
      email: emailLogin,
      password: passwordLogin,
    };
    try {
      let res = await fetch('https://medium-web-app-backend.herokuapp.com/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      let data = await res.json();
      // console.log(data);
      if(data.message == 'User does not exist'){
        setLoginFailed(true);
        setAccountExists(false);
        setAccountCreated(false);
        setLoginFailedPass(false);
        setLoginSuccess(false);
        setTimeout(() => {
          setLoginFailed(false);
        }
        , 3000);

      }
      else if(data.message == 'Incorrect password'){
        setLoginFailed(false);
        setAccountExists(false);
        setAccountCreated(false);
        setLoginFailedPass(true);
        setLoginSuccess(false);
        setTimeout(() => {
          setLoginFailedPass(false);
        }
        , 3000);
      }
      else{
        localStorage.setItem('token', data.token);
        setLoginSuccess(true);
        setLoginFailed(false);
        setAccountExists(false);
        setAccountCreated(false);
        setLoginFailedPass(false);
        setTimeout(() => {
          setLoginSuccess(false);
          navigate('/homepage');
        }
        , 3000);

      }
    } catch (error) {
      console.log(error);
    }
  };

  //signup function
  const registerWithFG = async userData => {
    // console.log('called',userData);
    try {
      let res = await fetch('https://medium-web-app-backend.herokuapp.com/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      let data = await res.json();
      // console.log(data);
      if(data.message == 'User already exists'){
        setAccountCreated(false);
        setAccountExists(true);
        setLoginFailedPass(false);
        setLoginSuccess(false);
        setLoginFailed(false);
        setTimeout(()=>{
          setAccountExists(false);
        },3000);
        return;
      }
      else{

        setAccountCreated(true);
        setAccountExists(false);
        setLoginFailedPass(false);
        setLoginSuccess(false);
        setLoginFailed(false);
        setTimeout(()=>{
          setAccountCreated(false);
        }
        ,3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const responseFacebookRegister = response => {
    console.log(response);
  };

  const responseGoogleRegister = response => {
    // console.log(response);
    registerWithFG({
      name: response.profileObj.name,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      avatar: response.profileObj.imageUrl
    });
  };

  const handleRegisterWithEmail = async () => {
    if (
      registerName.length === 0 &&
      registerEmail.length === 0 &&
      registerPassword.length === 0
    ) {
      setIsErrorInEmailRegister(1);
      setIsErrorInNameRegister(1);
      setIsErrorInPassRegister(1);
      return;
    } else if (registerName.length === 0) {
      setIsErrorInEmailRegister(0);
      setIsErrorInNameRegister(1);
      setIsErrorInPassRegister(0);
      return;
    } else if (registerEmail.length === 0) {
      setIsErrorInEmailRegister(1);
      setIsErrorInNameRegister(0);
      setIsErrorInPassRegister(0);
      return;
    } else if (registerPassword.length === 0) {
      setIsErrorInEmailRegister(0);
      setIsErrorInNameRegister(0);
      setIsErrorInPassRegister(1);
      return;
    } else {
      setIsErrorInEmailRegister(0);
      setIsErrorInNameRegister(0);
      setIsErrorInPassRegister(0);
    }
    let userData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    };
    try {
      let res = await fetch('https://medium-web-app-backend.herokuapp.com/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      let data = await res.json();
      // console.log(data);
      // register Success full popup
      if(data.message == 'User already exists'){
        setAccountCreated(false);
        setAccountExists(true);
        setLoginFailedPass(false);
        setLoginFailed(false);
        setLoginSuccess(false);
        setTimeout(()=>{
          setAccountExists(false);
        },3000);
        return;
      }
      else{

        setAccountCreated(true);
        setAccountExists(false);
        setLoginFailedPass(false);
        setLoginFailed(false);
        setLoginSuccess(false);
        setTimeout(()=>{
          setAccountCreated(false);
        }
        ,3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //use effect
  React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_ID,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);
  

  return (
    <>
      <span onClick={onOpen}>{mainTitle}</span>
      {
        accountCreated ? <Toast type='accountCreated' />: null
      }
      {
        accountExists ? <Toast type='accountExists' />: null
      }
      {
        loginFailedPass ? <Toast type='loginFailedPass' />: null
      }
      {
        loginFailed ? <Toast type='loginFailed' />: null
      }
      {
        loginSuccess ? <Toast type='loginSuccess' />: null
      }
      <Modal isOpen={isOpen} onClose={onClose} id='popup-modal'>
        <ModalOverlay />
        <ModalContent
          maxH={'1000px'}
          maxW="678px"
          marginTop={'0px'}
          marginBottom="0px"
          textAlign={'center'}
        >
          <ModalCloseButton />
          {popup ? (
            <>
              {showRegister ? (
                <>
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
                      Join Medium.
                    </ModalHeader>
                  </ModalBody>
                  <Box>
                    <Box>
                      <Box margin={'10px'} className="login-with-facebook">
                        <FaFacebook color='blue' size={22}/>
                        <FacebookLogin 
                          appId="358532346452010" //APP ID NOT CREATED YET
                          fields="name,email,picture"
                          textButton='Sign up with Facebook'
                          cssClass=''
                          callback={responseFacebookRegister}
                        />
                      </Box>
                      <Box margin={'10px'}>
                        <GoogleLogin
                          clientId= {process.env.REACT_APP_ID} //CLIENTID NOT CREATED YET
                          buttonText="Sign up with Google"
                          className='login-with-google'
                          icon={true} 
                          onSuccess={responseGoogleRegister}
                          onFailure={responseGoogleRegister}
                        />
                      </Box>

                      <Box marginBottom={'40px'} className='login-with-email'>
                      <GoMail size={22} />
                        <Button
                          // id="mailButton"
                         id='login-with-email-button'
                          value={showRegister}
                          onClick={() => setShowRegister(0)}
                        >
                         Sign up with Email
                        </Button>
                      </Box>
                      <p id="signBtn">
                        Already have an account?
                        <span id='signInBtn' onClick={()=>setPopup(false)}>Sign in</span>
                        {/* <Login mainTitle="Sign in" /> */}
                      </p>
                    </Box>
                    <Box id="termncon">
                      Click “Sign Up” to agree to Medium’s Terms of Service and
                      acknowledge that Medium’s Privacy Policy applies to you.
                    </Box>
                  </Box>
                </>
              ) : (
                <>
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
                      Sign up with email
                    </ModalHeader>
                  </ModalBody>
                  <Box padding="0px 40px 50px 40px">
                    <Box>
                      <Box>
                        <h4 className="contentBox">
                          Enter the email address associated with your account,
                          and we’ll send a magic link to your inbox.
                        </h4>
                      </Box>

                      <FormControl id="emailBox">
                        <FormLabel id="formLabelStyle">Your Name</FormLabel>
                        <Input
                          type="text"
                          border={'none'}
                          borderBottom="1px"
                          borderRadius={'0px'}
                          value={registerName}
                          onChange={e => setRegisterName(e.target.value)}
                        />
                        {isErrorInNameRegister ? (
                          <FormHelperText align="center">
                            Name is required.
                          </FormHelperText>
                        ) : (
                          <FormErrorMessage></FormErrorMessage>
                        )}
                        <FormLabel id="formLabelStyle">Your Email</FormLabel>
                        <Input
                          type="email"
                          border={'none'}
                          borderBottom="1px"
                          borderRadius={'0px'}
                          value={registerEmail}
                          onChange={e => setRegisterEmail(e.target.value)}
                        />
                        {isErrorInEmailRegister ? (
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
                          value={registerPassword}
                          onChange={e => setRegisterPassword(e.target.value)}
                        />
                        {isErrorInPassRegister ? (
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
                          onClick={handleRegisterWithEmail}
                        >
                          Continue
                        </Button>
                      </Stack>
                      <Stack spacing={4} direction="row" align="center">
                        <Button
                          id="goBackBtn"
                          value={showRegister}
                          onClick={() => setShowRegister(1)}
                          size="sm"
                        >
                          All sign up options
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </>
              )}
            </>
          ) : (
            <>
              {showLogin ? (
                <>
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
                    <Box margin={'10px'} className="login-with-facebook">
                    <FaFacebook color='blue' size={22}/>
                      <FacebookLogin
                        appId="358532346452010" //APP ID NOT CREATED YET
                        fields="name,email,picture"
                        textButton='Sign in with Facebook'
                        cssClass=''
                        callback={responseFacebookLogin}
                      />
                    </Box>
                    <Box margin={'10px'}>
                      {/* <div className='google-box'> */}
                      <GoogleLogin
                        clientId={process.env.REACT_APP_ID} //CLIENTID NOT CREATED YET
                        buttonText="Sign in with Google"
                        className='login-with-google'
                          icon={true}
                        onSuccess={responseGoogleLogin}
                        onFailure={responseGoogleLogin}
                      />
                      {/* </div> */}
                    </Box>

                    <Box marginBottom={'40px'} className='login-with-email'>
                    <GoMail size={22}/>
                      <Button
                        // id="mailButton"
                        id='login-with-email-button'
                        value={showLogin}
                        onClick={() => setShowLogin(0)}
                      >
                         Sign In with Email
                      </Button>
                    </Box>
                    <p id="signBtn">
                      No account?
                      <span id='createOneBtn' onClick={()=>setPopup(true)}>Create One</span>
                      {/* <Register mainTitle="Create One" /> */}
                    </p>
                  </Box>
                  <Box id="termncon">
                    Click “Sign In” to agree to Medium’s Terms of Service and
                    acknowledge that Medium’s Privacy Policy applies to you.
                  </Box>
                </>
              ) : (
                <>
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
                          Enter the email address associated with your account,
                          and we’ll send a magic link to your inbox.
                        </h4>
                      </Box>
                      <FormControl id="emailBox">
                        <FormLabel id="formLabelStyle">Your Email</FormLabel>
                        <Input
                          type="email"
                          border={'none'}
                          borderBottom="1px"
                          borderRadius={'0px'}
                          value={emailLogin}
                          onChange={e => setEmailLogin(e.target.value)}
                        />
                        {isErrorInEmailLogin ? (
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
                          value={passwordLogin}
                          onChange={e => setPasswordLogin(e.target.value)}
                        />
                        {isErrorInPassLogin ? (
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
                          value={showLogin}
                          onClick={() => setShowLogin(1)}
                          size="sm"
                        >
                          All sign in options
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default PopupModal;
