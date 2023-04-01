import React from 'react';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import './HomepageBS.css';
import { Avatar, Box, Heading, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import PopupModal from '../PopupModal/PopupModal';
import { PopupContext } from '../../Context/PopupContext';
import { Link, useNavigate } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';

function HomepageBS() {
  const { setPopup } = React.useContext(PopupContext);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/homepage');
    }
  },[])

  const getAllPosts = async () => {
    try {
      setIsLoadingPosts(true);
      let res = await fetch('https://medium-backend.onrender.com/getAllPosts');
      let data = await res.json();
      let rand = Math.round(Math.random()*100);
      data = data.slice(rand, rand+20);
      setAllPosts(data);
      setIsLoadingPosts(false);
      // console.log(data);
    } catch (error) {
      console.log('error');
    }
  };

  const getDate = (createdAt) => {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let date = createdAt.split('T')[0].split('-').map(Number);
    return `${date[2]} ${months[date[1] - 1]}`;
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="banner">
        <div style={{ paddingLeft: '120px' }}>
          <h1>Stay curious.</h1>
          <p>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <button
            onClick={() => {
              setPopup(true);
            }}
          >
            <PopupModal mainTitle="Start reading" />
          </button>
        </div>

        <div id="banner-img-box">
          <img src="/mmmmm.png" id="mmmmmimg" alt="" />
        </div>
      </div>

      <div className="trending">
        <Link to="/">
          <img src="/tranding.png" alt="F9BO9K.png" border="0" />
        </Link>
      </div>
      <br />

      <div className="blogs">
        <div
          style={{ paddingLeft: '50px', paddingRight: '30px' }}
          className="posts"
        >
          {
            isLoadingPosts ? (<>
            <Box mt={2} style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                        <Box mt={5} style={{display:"flex", flexDirection:"row", gap:"20px"}}>
                        <SkeletonCircle size="10"  />
                        <Skeleton height="20px" margin='auto' ml={0} mr={0} width='150px' />
                        
                        </Box>
                        <Skeleton height="30px" mt={1} mb={1} />
                        <Skeleton height="18px" />
                        <Skeleton height="18px" />
                        <Skeleton height="18px" />
                        <Box style={{display:"flex", flexDirection:"row", gap:"20px"}}>
                            <Skeleton height="15px" width={100} />
                            <Skeleton height="15px" width={150}/>
                        </Box>
                    </Box>
                    <Box mt={2} style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                        <Box mt={5} style={{display:"flex", flexDirection:"row", gap:"20px"}}>
                        <SkeletonCircle size="10"  />
                        <Skeleton height="20px" margin='auto' ml={0} mr={0} width='150px' />
                        
                        </Box>
                        <Skeleton height="30px" mt={1} mb={1} />
                        <Skeleton height="18px" />
                        <Skeleton height="18px" />
                        <Skeleton height="18px" />
                        <Box style={{display:"flex", flexDirection:"row", gap:"20px"}}>
                            <Skeleton height="15px" width={100} />
                            <Skeleton height="15px" width={150}/>
                        </Box>
                    </Box>
                    <Box mt={2} style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                        <Box mt={5} style={{display:"flex", flexDirection:"row", gap:"20px"}}>
                        <SkeletonCircle size="10"  />
                        <Skeleton height="20px" margin='auto' ml={0} mr={0} width='150px' />
                        
                        </Box>
                        <Skeleton height="30px" mt={1} mb={1} />
                        <Skeleton height="18px" />
                        <Skeleton height="18px" />
                        <Skeleton height="18px" />
                        <Box style={{display:"flex", flexDirection:"row", gap:"20px"}}>
                            <Skeleton height="15px" width={100} />
                            <Skeleton height="15px" width={150}/>
                        </Box>
                    </Box>
            </>) : <>
            {allPosts.map((post, index) => (
            <div key={index} style={{marginBottom:"40px"}}>
              <div style={{ gap: '10px' }} className="avatar">
                <Avatar size="xs" name={post.user.name} src={post.user.avatar}/>
                <Heading size="sm" fontWeight={500}>
                  {post.user.name}
                </Heading>
              </div>

              <Heading
                style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
                size="md"
              >
                {post.title}
              </Heading>
              {/* <div className="content">{post.content}</div> */}
              <Heading
                style={{
                  fontFamily:
                    "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
                className="content-box"
                size="sm"
                fontWeight={400}
              >
                {(post.content).substring(0,290)} . . .
              </Heading>
              <div className='post-details-div'>
                <span>{getDate(post.createdAt)}</span>
                <span><BsDot /></span>
                <span>{Math.ceil(Math.random()*6)} min read</span>
              </div>
            </div>
          ))}
            </>
          }
        </div>

        <div style={{ position: 'relative', right: '0' }} className="discover">
          <div style={{ position: 'sticky', top: '110px' }}>
            <h1>DISCOVER MORE OF WHAT MATTERS TO YOU</h1>

            <div className="explore">
              <button>Self</button>
              <button>Relationships</button>
              <button>Data Science</button>
              <button>Programming</button>
              <button>Productivity</button>
              <button>Javascript</button>
              <button>Development</button>
              <button>Politics</button>
              <button>Health</button>
            </div>

            <div style={{ width: '100%', gap: '15px' }} className="info">
              <p>Help</p>
              <p>Status</p>
              <p>Writers</p>
              <p>Blog</p>
              <p>Careers</p>
              <p>Privacy</p>
              <p>Terms</p>
              <p>About</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomepageBS;
