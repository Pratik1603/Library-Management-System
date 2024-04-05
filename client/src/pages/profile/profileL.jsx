import { useState,useEffect } from "react";
import { Button, Sidebar } from 'flowbite-react';
import React from "react";
import Book_Profile from "./book_profile.jsx"
import Librarian from "./librarian.jsx";
import Patron from "./patron.jsx";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { DarkThemeToggle} from 'flowbite-react';
import Profile1 from "./profile.jsx";
import { signoutSuccess } from '../../redux/user/userSlice.jsx';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Issues from "../../components/issue.jsx";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { YourBook } from "./yourBook.jsx";
import { Tooltip } from "flowbite-react";
const Profile = () => {
  const {currentUser}=useSelector(state=>state.user);
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("profile");
  const logout = async() => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());

      }
    } catch (error) {
      console.log(error.message);
    }
  }
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth <= 640); // Adjust the width breakpoint as needed
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  const renderContent = () => {
    switch (tab) {
      case "profile":
        return <Profile1/>;
      case "books":
        return <Book_Profile />;
      case "patrons":
        return <Patron />;
      case "issues":
        return <Issues/>;
      case "booksIssued":
        return <YourBook/>;
      case "librarian":
        return <Librarian/>
      default:
        return <Profile1/>;
        
    }
  };

  // Defining the custom theme object
  const customTheme = {
    root: {
      inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800 bg-white'
    },
    item: {
      base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-[#9E77D1] hover:text-white dark:text-white dark:hover:bg-[#9E77D1]',
      active: 'text-white bg-[#9E77D1]',
      icon: {
        base: 'h-6 w-6 ml-[5%] mr-[10%] flex-shrink-0 text-black-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
        active: 'text-white-700 dark:text-white-100',
      },
    },
  };
  // console.log(selectedTab);
  console.log(currentUser);
  return (
    <div className="w-full h-screen flex flex-row">
      <div className=" h-full">
       <Sidebar theme={customTheme} className="w-16 md:w-56  font-bold py-2 " >
          <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo" className="my-8 md:my-0">
            
          </Sidebar.Logo>


          <Sidebar.Items >
            <Sidebar.ItemGroup>
              <Tooltip content={currentUser.username}>
              <div className="rounded-full md:h-36 md:w-36 h-12 w-12 border-2  my-4 md:mx-[10%] mx-auto ">
                  <img src={currentUser?.profilePicture} className="w-full h-full  rounded-full"/>
              </div>
              </Tooltip>
              
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup >
            <Link to='/profile?tab=profile'>
           
              <Sidebar.Item   active={tab=='profile'} className='cursor-pointer rounded-full md:rounded-xl my-6 md:my-0 text-[1.2rem] font-semibold flex 
              '>
                 <Tooltip content="Profile">
                 <PermIdentityIcon/>
              <div className=" hidden  md:inline mx-[15%]">Profile</div>
                </Tooltip>
             
              
             
              </Sidebar.Item>
              </Link>
              { (currentUser.isOwner ||currentUser.isLibrarian) && <Link to='/profile?tab=books'>
              <Sidebar.Item  active={tab === 'books'} className='cursor-pointer rounded-full my-6 md:my-0 md:rounded-xl text-[1.2rem] font-semibold'>
              <Tooltip content="Books">
              <AutoStoriesIcon/>
              <div className=" hidden  md:inline mx-[15%]">Books</div>
                </Tooltip>
              
              </Sidebar.Item>
              </Link>}
              {!currentUser.isOwner && !currentUser.isLibrarian && 
              <Link to='/profile?tab=booksIssued'>
                <Sidebar.Item  active={tab === 'booksIssued'} className='cursor-pointer rounded-full my-6 md:my-0 md:rounded-xl text-[1.2rem] font-semibold'>
      
                <Tooltip content="My Books">
                  <AutoStoriesIcon/>
                  <div className=" hidden  md:inline mx-[15%]">My Books</div>
                </Tooltip>
             
                </Sidebar.Item>
              </Link>
              }
              <Link to='/profile?tab=issues'>
              <Sidebar.Item  active={tab === 'issues'} className='cursor-pointer rounded-full my-6 md:my-0 md:rounded-xl text-[1.2rem] font-semibold'>
              <Tooltip content="Issues">
              <LibraryBooksIcon/>
              <div className=" hidden  md:inline mx-[15%]">Issues</div>
              </Tooltip>
              
              </Sidebar.Item>
              </Link>
              {(currentUser?.isOwner || currentUser?.isLibrarian) &&  
               <Link to='/profile?tab=patrons'>
              <Sidebar.Item   active={tab === 'patrons'} className='rounded-full md:rounded-xl  my-6 md:my-0 cursor-pointer text-[1.2rem] font-semibold'>
              <Tooltip content="Patrons">
              <PeopleAltIcon/>
              <div className=" hidden  md:inline mx-[15%]">Patrons</div>
              </Tooltip>
             
              </Sidebar.Item>
              </Link>}
              {currentUser.isOwner && <Link to='/profile?tab=librarian'>
              <Sidebar.Item   active={tab === 'librarian'} className='rounded-full my-6 md:my-0 md:rounded-xl cursor-pointer text-[1.2rem] font-semibold'>
              <Tooltip content="Librarian">
              <PeopleAltIcon/>
              <div className=" hidden  md:inline mx-[15%]">Librarian</div>
              </Tooltip>
              
              </Sidebar.Item>
              </Link>}
              <Sidebar.Item onClick={() => logout()}  active={tab === 'logout'} className='rounded-full my-6 md:my-0 md:rounded-xl cursor-pointer text-[1.2rem] font-semibold'>
              <Tooltip content="Sign Out">
              <LogoutIcon/>
              <div className=" hidden  md:inline mx-[15%]">Sign Out</div>
              </Tooltip>
              
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            {/* <Sidebar.ItemGroup>
              <Sidebar.Item   className=' text-[1.2rem] font-semibold'>
              <DarkThemeToggle/>
              </Sidebar.Item>

            </Sidebar.ItemGroup> */}
          </Sidebar.Items>
        </Sidebar>
       
      </div>  
      <div className={`${isMobile?"w-[97%] h-[97%]" :"w-[84%] h-[97%]"} mx-auto m-[1%] shadow-xl   rounded-xl bg-[#f6edff]  `}>
        {renderContent()}
      </div>
    </div>
  )

}

export default Profile;

