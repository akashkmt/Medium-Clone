import React from 'react';
import { Avatar, Button } from '@chakra-ui/react';
import './LeftNav.css';
import { Link } from 'react-router-dom';
import { VscHome } from 'react-icons/vsc';
import { TiHome } from 'react-icons/ti';
import { MdNotifications, MdNotificationsNone } from 'react-icons/md';
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { RiFileListLine, RiFileListFill } from 'react-icons/ri';
import { LeftNavContext } from '../../Context/LeftNavContext';
import { useNavigate } from 'react-router-dom';

export default function Left() {
  const [logoutPopUp, setLogoutPopUp] = React.useState(false);
  const navigate = useNavigate();
    const { home, noti, book, story, handleClick, user, setUser } = React.useContext(LeftNavContext);
    const [loggedUser, setLoggedUser] = React.useState(user);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    const getUser = async (token) => {
      try {
        token = token || localStorage.getItem('token');
        let res = await fetch(`https://medium-web-app-backend.herokuapp.com/getUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token
          }
        });
        let user = await res.json(); 
        setLoggedUser(user);
        setUser(user);
        // console.log(user);
      } catch (error) {
        console.log(error)
      }
    }


    React.useEffect(()=>{
        if(localStorage.getItem('token')){
          getUser(localStorage.getItem('token'))
        }
    },[])
  return (
    <div className="left">
      <div className="mid">
        <div className="tem0">
          <Link to="/homepage">
            <img
              src="https://seeklogo.com/images/M/medium-logo-F0ACFCCD58-seeklogo.com.png"
              alt=""
            />
          </Link>
        </div>
        <div className="tem1">
          <Link to="/homepage">
            {home ? (
              <TiHome
                size={25}
                onClick={() => {
                  handleClick('home');
                }}
              />
            ) : (
              <VscHome
                size={25}
                onClick={() => {
                  handleClick('home');
                }}
              />
            )}
          </Link>
        </div>
        <div className="tem1">
          {' '}
          <Link to="/notification">
            {' '}
            {!noti ? (
              <MdNotificationsNone
                size={25}
                onClick={() => {
                  handleClick('noti');
                }}
              />
            ) : (
              <MdNotifications
                size={25}
                onClick={() => {
                  handleClick('noti');
                }}
              />
            )}
          </Link>
        </div>

        <div className="tem1">
          <Link to="/bookmark">
            {!book ? (
              <BsBookmarks
                size={25}
                onClick={() => {
                  handleClick('book');
                }}
              />
            ) : (
              <BsBookmarksFill
                size={25}
                onClick={() => {
                  handleClick('book');
                }}
              />
            )}
          </Link>
        </div>
        <div className="tem1">
          <Link to="/story">
            {!story ? (
              <RiFileListLine
                size={25}
                onClick={() => {
                  handleClick('story');
                }}
              />
            ) : (
              <RiFileListFill
                size={25}
                onClick={() => {
                  handleClick('story');
                }}
              />
            )}
          </Link>
        </div>
        <hr style={{backgroundColor:"gray", borderColor:"gray", marginRight:"15px", marginLeft:"-10px"}} />
        <div className="tem1">
          
          <Link to="/create">
            <FiEdit size={25} />
          </Link>
        </div>
      </div>
      <div>
        <Avatar
          marginLeft={'-2vh'}
          marginTop={'10vh'}
          // w={'2.5vw'}
          // h={'5vh'}
          style={{ cursor: 'pointer' }}
          name={loggedUser ? loggedUser.name : ''}
          src={loggedUser ? loggedUser.avatar : ''}
          onClick={()=>{setLogoutPopUp(!logoutPopUp)}}
        ></Avatar>
      </div>
      {
        logoutPopUp ? (<div style={{position:"absolute", bottom:"43px", left:"87px"}}>
          <Button onClick={handleLogout}>Logout</Button>
        </div>) : null
      }
    </div>
  );
}
