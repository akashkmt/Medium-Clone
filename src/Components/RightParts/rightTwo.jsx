import { Avatar, Box, Button, Heading, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';
import './right.css';
import { GiMailedFist } from 'react-icons/gi';
// import { LeftNavContext } from '../../Context/LeftNavContext';

export default function RightTwo({ userPost }) {
  const [singleUser, setSingleUser] = React.useState(userPost);
  // const { user } = React.useContext(LeftNavContext);
  const [user, setUser] = React.useState();
  const [followed, setFollowed] = React.useState(null);
  const [isLoadingUser, setIsLoadingUser] = React.useState(false);

  const checkFollowed = async user => {
    // console.log(user, singleUser);
    let check = await user.following.includes(userPost._id);
    // console.log(check);
    if (check) {
      setIsLoadingUser(true);
      setFollowed(true);
      setIsLoadingUser(false);
    } else {
      setFollowed(false);
    }
  };
  // console.log(user)
  //follow a user
  const followUser = async userId => {
    try {
      setIsLoadingUser(true);
      let token = localStorage.getItem('token');
      await fetch(`https://medium-backend.onrender.com/followUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      });
      await refreshUser().then(() => {
        getUser(localStorage.getItem('token'));
      });
      setFollowed(true);
      setIsLoadingUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  //unfollow a user
  const unfollowUser = async userId => {
    try {
      setIsLoadingUser(true);
      let token = localStorage.getItem('token');
      await fetch(`https://medium-backend.onrender.com/unfollowUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      });
      await refreshUser().then(() => {
        getUser(localStorage.getItem('token'));
      });
      setFollowed(false);
      setIsLoadingUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  //refresh user
  const refreshUser = async () => {
    try {
      setIsLoadingUser(true);
      let res = await fetch(
        `https://medium-backend.onrender.com/getSingleUser/${userPost._id}`
      );
      let result = await res.json();
      // console.log(result);
      setSingleUser(result);
      setIsLoadingUser(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async token => {
    try {
      setIsLoadingUser(true);
      let res = await fetch(`https://medium-backend.onrender.com/getUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      });
      let user = await res.json();
      await setUser(user);
      //   console.log("user",user);
      setIsLoadingUser(false);
      checkFollowed(user);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser(localStorage.getItem('token'));
    }
  }, []);

  return (
    <div className="right">
      <div>
        <button>Get unlimited access</button>
      </div>
      <div>
        <input type="text" id="search" placeholder="Search" />
      </div>
      <>
        {isLoadingUser ? (
          <Box className="loading" ml="40px" mt={15} mb={5}>
            <SkeletonCircle size="20" margin="auto" mt={5} />
            <Skeleton height="32px" mt="5" />
            <Skeleton height="20px" mt="8" />
            <Skeleton height="20px" mt="4" />
            <Skeleton height="20px" mt="4" />
            <Skeleton height="32px" mt="5" />
          </Box>
        ) : (
          <>
            {singleUser._id ? (
              <>
                <div
                  style={{
                    margin: 'auto',
                    marginTop: '40px',
                    marginBottom: '20px',
                  }}
                >
                  <Avatar size={'xl'} name={singleUser.name} src={singleUser.avatar}/>
                </div>
                <div>
                  <Heading size="lg" textAlign="center">
                    {singleUser.name}
                  </Heading>
                </div>
                <br />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Heading size="xs" fontWeight={500} textAlign="center">
                    Following : {singleUser.following.length}
                  </Heading>
                  <Heading size="xs" fontWeight={500} textAlign="center">
                    Followers : {singleUser.followers.length}
                  </Heading>
                  <Heading size="xs" fontWeight={500} textAlign="center">
                    User since : {singleUser.createdAt.split('T')[0]}
                  </Heading>
                </div>
                {
                  user && user._id === singleUser._id ? (<h1 style={{marginTop:"40px", marginBottom:"40px"}}></h1>) : <>
                  <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '30px',
                  }}
                >
                  {followed ? (
                    <Button
                      onClick={() => {
                        unfollowUser(singleUser._id);
                      }}
                      style={{
                        backgroundColor: 'white',
                        color: 'green',
                        width: '120px',
                        margin: '0px',
                        border: '.1px solid green',
                      }}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        followUser(singleUser._id);
                      }}
                      style={{
                        backgroundColor: 'green',
                        width: '120px',
                        margin: '0px',
                      }}
                    >
                      Follow
                    </Button>
                  )}

                  <Button
                    style={{
                      width: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'green',
                      margin: '0px',
                    }}
                  >
                    <GiMailedFist />
                  </Button>
                </div>
                  </>
                }
              </>
            ) : null}
          </>
        )}
      </>
      <Heading
        as="h4"
        marginLeft={10}
        marginTop={7}
        marginBottom={5}
        fontSize={20}
        fontWeight={500}
        className="li-tag"
      >
        More From Medium
      </Heading>
      <div className="topic">
        <HStack spacing="10px">
          <Avatar
            size="xs"
            name="Akash Kumawat"
          />
          <Heading as="h6" fontWeight={600} size="xs">
            Akash Kumawat
          </Heading>
        </HStack>
        <Heading as="h5" mt={2} cursor="pointer" size="sm">
          Can Reading Fiction Make You a Better Person?
        </Heading>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: '40px',
          paddingRight: '40px',
          flexWrap: 'wrap',
          fontSize: '13px',
          gap: '5px',
          marginTop: '10px',
        }}
      >
        <p>Help</p>
        <p>Status</p>
        <p>Writers</p>
        <p>Blog</p>
        <p>Careers</p>
        <p>Privacy</p>
        <p>Terms</p>
        <p>About</p>
        <p>Knowable</p>
      </div>
    </div>
  );
}
