import React, { useEffect } from 'react';
import {
  Box,
  Button,
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

import style from '../Login/login.css';

const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isErrorInName, setIsErrorInName] = React.useState(0);
  const [isErrorInEmail, setIsErrorInEmail] = React.useState(0);
  const [isErrorInPass, setIsErrorInPass] = React.useState(0);

  const [show, setShow] = React.useState(1);
  const responseFacebook = response => {
    console.log(response);
  };

  const responseGoogle = response => {
    console.log(response);
  };

  const handleLogin = () => {
    // console.log(isError);
    if (name.length == 0) {
      setIsErrorInName(1);
    }
    if (email.length == 0) {
      setIsErrorInEmail(1);
    }
    if (password.length == 0) {
      setIsErrorInPass(1);
    }
    else{
        setIsErrorInEmail(0);
        setIsErrorInName(0);
        setIsErrorInPass(0)
    }
  };
  const signInWithEmail = () => {};
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          '72702126253-gk8cjqhtn4spj35a336earhlej9b3i8d.apps.googleusercontent.com',
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);
  return show ? (
    <Box className="LoginBox">
      <Box paddingBottom={'50px'}>
        <Button
          display={'block'}
          textDecoration={'none'}
          background="none"
          float={'right'}
        >
          X
        </Button>
      </Box>
      <Box marginTop={'50px'}>
        <h1 className="header">Join Medium.</h1>
      </Box>
      <Box className="fbButton">
        <Box>
          <FacebookLogin
            appId="358532346452010" //APP ID NOT CREATED YET
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </Box>
        <Box>
          <GoogleLogin
            clientId="72702126253-gk8cjqhtn4spj35a336earhlej9b3i8d.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            buttonText="Sign up with google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </Box>

        <Box marginBottom={'40px'}>
          <Button id="mailButton" value={show} onClick={() => setShow(0)}>
            <GoMail></GoMail> Sign up with Email
          </Button>
        </Box>
        <p id="createAccountBox">
          Already have an account?
          <Button
            color={'rgb(26, 137, 23)'}
            textDecoration={'none'}
            background="none"
            padding={'0px'}
          >
            Sign in
          </Button>
        </p>
      </Box>
      <Box id="termncon">
        Click “Sign In” to agree to Medium’s Terms of Service and acknowledge
        that Medium’s Privacy Policy applies to you.
      </Box>
    </Box>
  ) : (
    <>
      <Box className="LoginBox" padding="0px 40px 50px 40px">
        <Box paddingBottom={'50px'}>
          <Button
            value={show}
            onClick={() => setShow(1)}
            display={'block'}
            textDecoration={'none'}
            background="none"
            float={'right'}
          >
            X
          </Button>
        </Box>
        <Box>
          <h2 className="header">Sign in with email</h2>
          <Box>
            <h4 className="contentBox">
              Enter the email address associated with your account, and we’ll
              send a magic link to your inbox.
            </h4>
          </Box>
          <FormControl id="emailBox">
            <FormLabel id="formLabelStyle">Your Name</FormLabel>
            <Input
              type="text"
              border={'none'}
              borderBottom="1px"
              borderRadius={'0px'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {isErrorInName ? (
              <FormHelperText align="center">Name is required.</FormHelperText>
            ) : (
              <FormErrorMessage></FormErrorMessage>
            )}
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
              <FormHelperText align="center">Email is required.</FormHelperText>
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
              onClick={handleLogin}
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
              All sign up options
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Register;

{
  /* <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> */
}
