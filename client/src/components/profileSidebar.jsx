import React, { useState,useRef,useEffect } from "react";

// import Profile from "../pages/home/profile/profile.jsx";
import { Card } from 'flowbite-react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { app } from '../firebase.jsx';
import { useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PublishIcon from '@mui/icons-material/Publish';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
  import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutSuccess,
  } from '../redux/user/userSlice';
const ProfileSidebar=()=>{
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const data = [
        { name: 'January', patrons: 400 },
        { name: 'February', patrons: 300 },
        { name: 'March', patrons: 100 },
        { name: 'April', patrons: 200 },
        { name: 'May', patrons: 500 },
        { name: 'June', patrons: 300 },
        // ...add other months with the number of patrons
    ];
    const data1 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const customTheme = {
        root: {
            base: 'flex rounded-lg  bg-white dark:border-gray-700 dark:bg-gray-800',
        }
    }
    const customTheme1 = {
        root: {
            base: 'flex rounded-lg  bg-white dark:border-gray-700 dark:bg-gray-800',
        }
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const [isMobile, setIsMobile] = useState(false);

    const [formData, setFormData] = useState(currentUser);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
        console.log(imageFile);
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };


  const handleSubmit = async (e) => {
 
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }console.log(formData);

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
      setImageFile(null);
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };


    return(
        <div className="bg-white  shadow-xl w-[100%] h-full  p-4">
      
        <div className="font-semibold text-lg px-2 py-1">
            My Profile
        </div>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        
        <div  className="  rounded-full h-40 w-40 md:h-28 md:w-28  mx-auto my-2 relative ">
        {!imageFile && <div onClick={() => filePickerRef.current.click()} className="shadow-xl absolute -right-1 -bottom-1 md:w-10 md:h-10 bg-[#FC882F] text-white w-12 h-12 text-center rounded-full py-[4%] ">
          <AddAPhotoIcon  style={{fontSize:"20px"}}/>
        </div>}
        {imageFile && <div onClick={(e) => handleSubmit(e)} className="z-10 shadow-xl absolute -right-1 -bottom-1 md:w-10 md:h-10 bg-[#2d8f26] text-white w-12 h-12 text-center rounded-full py-[4%] ">
          <PublishIcon  style={{fontSize:"20px"}}/>
        </div>}
        {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              
              strokeWidth={5}   
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
          

        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )} 
           
        </div>
        
          {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          l{updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          k{error}
        </Alert>
      )}
        <h3 className="text-lg text-center tracking-tight font-bold text-gray-900 dark:text-white">
            {currentUser?.username}
        </h3>
        <h3 className="text-sm text-center tracking-tight  text-gray-900 dark:text-white">
            {currentUser?.email}
        </h3>

        <div className="mt-[2%] h-[25%]  rounded-xl  shadow-xl ">
            <Card theme={customTheme} className=" h-full ">
                <div className="flex h-[4%] items-center justify-between">
                    <div className="text-xl font-bold leading-none text-gray-900 dark:text-white">Today</div>
                </div>
                <div className="flow-root h-[96%] overflow-y-scroll scrollbar-hide">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-1">
                            <div className="flex items-center space-x-4">
                                <div className="shrink-0">
                                    <div className="rounded-full h-10 w-10 bg-[#9E77D1] ">

                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-lg font-medium text-gray-900 dark:text-white">Neil Sims</p>
                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">Designer</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <NavigateNextIcon style={{fontSize:"40px",color:"gray"}}/>
                                </div>
                            </div>
                        </li>
                        </ul>
                        </div>
                        
            </Card>
        </div>  

        <div className="h-[30%] mt-[4%] md:mt-[2%] shadow-xl ">
            <Card theme={customTheme} className=" h-full">
                <div className="mb-1 h-[4%] flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Team</h5>
                </div>
                <div className="flow-root w-[100%] bg-[#f6edff]  rounded-xl p-2 h-[96%] overflow-y-scroll scrollbar-hide" >
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-2">
                            <div className="flex items-center space-x-4">
                                <div className="shrink-0">
                                    <div className="h-10 w-10 rounded-full border-2">

                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-lg font-medium text-gray-900 dark:text-white">Neil Sims</p>
                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">Designer</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <div className="rounded-full bg-[#fc9e10] w-3 h-3 m-2">

                                    </div>
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </Card>
        </div> 
        </div>
    )
}
export default ProfileSidebar;