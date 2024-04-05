import React from "react";
import { useState, useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import img from "../../Images/img.webp";
import SearchIcon from '@mui/icons-material/Search';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
    { name: 'January', patrons: 400 },
    { name: 'February', patrons: 300 },
    { name: 'March', patrons: 100 },
    { name: 'April', patrons: 200 },
    { name: 'May', patrons: 500 },
    { name: 'June', patrons: 300 },

];
import { useSelector, useDispatch } from "react-redux";
import { getUserStart, getUserFailure, getUserSuccess } from "../../redux/user/userSlice";
import { Button } from "flowbite-react/lib/cjs/components/Button/Button";
import { FloatingLabel, Modal } from "flowbite-react";

const Librarian = () => {
    const dispatch = useDispatch();
    const { currentUser, users } = useSelector((state) => state.user);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [showModal1,setShowModal1]=useState(false);
    const [librarianId,setLibrarianId]=useState();
    const[check,setCheck]=useState(0);
    useEffect(() => {
        const fetchLibrarians = async () => {
            try {
                dispatch(getUserStart());
                const res = await fetch(`/api/user/getUserLibrarians/${currentUser._id}`);
                // console.log("l");
                const data = await res.json();
                if (res.ok) {
                    dispatch(getUserSuccess(data.user.librarians));
                    // setUser(data.user.librarians);
                }
            } catch (error) {
                dispatch(getUserFailure);
                console.log(error.message);
            }
        };

        fetchLibrarians();
    }, [check]);

    const [searchTerm, setSearchTerm] = useState();
    const [username, setUsername] = useState();

    const handleSearch = () => {
        // Filter users based on search term
        const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
        // Update state with filtered users
       
        if(filteredUsers.length==0){
            setUser();
        }
        else{
            setUser(filteredUsers);
        }
    };

    const deleteLibrairan = async () => {
        try {
            const res = await fetch(`/api/user/deleteLibrarian/${librarianId}`, {
                method: 'PUT', 
            });
            const data = await res.json();
            if (res.ok) {
                setCheck(prevcheck=>!prevcheck);
                console.log(data);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const addLibrarian = async () => {
        try {
            console.log(username);
            const res = await fetch(`/api/user/addLibrarian`, {
                method: 'PUT', // Use PUT method
                headers: {
                    'Content-Type': 'application/json' // Specify content type as JSON
                },
                body: JSON.stringify({ username })
            });
            const data = await res.json();
            if (res.ok) {
                console.log(data);
                const updatedBooks = [...users, data.user];

                dispatch(getUserSuccess(updatedBooks));
                // setUser(updatedBooks);
                console.log(users);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="w-full rounded-xl  h-full p-[2%]">
            <div className="w-full  bg-[#a883d8] rounded-xl shadow-xl h-[30%] md:h-[40%] mb-[2%]">
                <div className="h-full  flex pt-2 justify-evenly">
                    <div className="h-full w-[50%] flex flex-col justify-evenly">
                        <div className="font-bold p-[2%] bg-white text-black text-sm md:text-2xl mb-[2%] mx-auto text-center flex flex-col justify-center w-[70%] h-[40%] md:w-[50%] md:h-[50%]  rounded-xl shadow-xl">
                            Total Librarians <br></br> {!users ? 0 : users?.length}
                        </div>

                        <div className="h-[50%]  mx-[10%]  md:my-0 my-4  ">
                            <div className="text-sm md:text-2xl  text-white mb-2  md:mb-2 font-bold">
                                Search Librarian
                            </div>
                            <div className="w-[90%] h-[20%] md:h-[30%] flex rounded-xl ">
                                <div className="rounded-l-xl h-full  w-[80%]">
                                    <input type="text" className="rounded-l-xl h-full w-full" onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <div className="rounded-r-xl w-[20%] h-full bg-[#f15757] text-center">
                                    <SearchIcon style={{ color: "white" }} onClick={() => handleSearch()} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=" h-full w-[50%] flex flex-col justify-evenly p-2">
                        <div className="rounded-2xl shadow-xl border-2 h-[50%] md:h-[70%] w-full mx-auto ">
                            <ResponsiveContainer width="100%" height="100%" className="bg-white rounded-2xl">
                                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPatrons" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f7964c" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#f7964c" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="patrons" stroke="#f7964c" fillOpacity={1} fill="url(#colorPatrons)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <Button className=" w-[100%] font-semibold text-sm md:text-lg md:w-[30%]  md:mx-[65%]" onClick={() => setShowModal(true)} outline gradientDuoTone="pinkToOrange">
                            Add Librarian
                        </Button>
                    </div>


                </div>

            </div>
            <div className="w-full   rounded-xl shadow-xl font-bold bg-white h-[67%] md:h-[55%] overflow-y-auto">
                <div className=" h-14  flex">
                    <div className="text-center w-[10%] flex flex-col text-[#424242] justify-center">
                        No
                    </div>
                    <div className="text-center w-[30%] flex flex-col text-[#424242] justify-center">
                        Name
                    </div>
                    <div className="text-center w-[25%] flex flex-col text-[#424242] justify-center">
                        Email
                    </div>
                    <div className="text-center w-[25%] flex flex-col text-[#424242] justify-center">
                        Joined on
                    </div>
                    <div className="text-center w-[15%] flex flex-col text-[#424242] justify-center">

                    </div>
                </div>
                {!users?.length && !user && <div className="w-full text-center text-2xl text-gray-700 my-[10%]">
                    No Librarans Yet ...
                </div>}
                
                {users?.length > 0 && !user && users?.map((patron,id) => (<div className={` h-14 ${id % 2 ? "bg-[#FBF5FF] text-[#463636] " : "bg-[#f0ddfd] text-[#424242]"}   flex`}>
                    <div className="text-center w-[10%] flex flex-col  text-[#424242] justify-center">
                        #{patron._id?.substring(patron._id.length - 3)}
                    </div>
                    <div className="text-center w-[30%] flex p-[2%] md:p-[1%]  text-[#424242] justify-evenly">
                        <div className="md:w-10 md:h-10 flex flex-col justify-center w-8 h-8 border-2 rounded-full overflow-hidden">
                            <img
                                src={patron.profilePicture}
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex flex-col justify-center ">
                            <div className="md:text-lg text-sm font-semibold">@{patron.username}</div>
                        </div>
                    </div>
                    <div className="md:text-sm text-center text-xs w-[25%] flex flex-col overflow-hidden text-[#424242] justify-center">
                        {patron.email}
                    </div>
                    <div className="text-center w-[25%] flex flex-col text-xs md:text-lg text-[#424242] justify-center">
                    {new Date(patron.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-center w-[15%] flex flex-col text-[#424242] justify-center">
                    <div className="text-center w-full flex items-center justify-evenly p-2 rounded-lg cursor-pointer">
                    <VisibilityIcon onClick={() => navigate(`/profile?tab=patrons&librarianId=${patron._id}`)} className="text-blue-500" />
                            <Button color="failure" size="xs" onClick={()=>{setShowModal1(true);setLibrarianId(patron._id)}}>
                        < DeleteIcon style={{height:"18px",width:"18px"}}/>
                     
                    </Button>
                    </div>
                    </div>
                </div>
                ))}

                {user?.length > 0 && user?.map((patron) => (<div className={` h-14 border-b-2 border-b-[#413b3b]  flex1 ${patron.id % 2 ? "bg-[#FBF5FF] text-[#463636] " : "bg-[#f0ddfd] text-[#424242]"}`}>
                <div className="text-center w-[10%] flex flex-col  text-[#424242] justify-center">
                        #{patron._id?.substring(patron._id.length - 3)}
                    </div>
                    <div className="text-center w-[30%] flex p-[2%] md:p-[1%]  text-[#424242] justify-evenly">
                        <div className="md:w-10 md:h-10 flex flex-col justify-center w-6 h-6 border-2 rounded-full overflow-hidden">
                            <img
                                src={patron.profilePicture}
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex flex-col justify-center ">
                            <div className="md:text-lg text-sm font-semibold">@{patron.username}</div>
                        </div>
                    </div>
                    <div className="md:text-sm text-center text-xs w-[25%] flex flex-col overflow-hidden text-[#424242] justify-center">
                        {patron.email}
                    </div>
                    <div className="text-center w-[25%] flex flex-col text-xs md:text-lg text-[#424242] justify-center">
                    {new Date(patron.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-center w-[15%] flex flex-col text-[#424242] justify-center">
                    <div className="text-center w-full flex items-center justify-center p-2 rounded-lg cursor-pointer">
                    <VisibilityIcon onClick={() => navigate(`/profile?tab=patrons&librarianId=${patron._id}`)} className="text-blue-500" />
                            <Button color="failure" size="xs" onClick={()=>{setShowModal1(true);setLibrarianId(patron._id)}}>
                        < DeleteIcon style={{height:"18px",width:"18px"}}/>
                     
                    </Button>
                    </div>
                    </div>
                </div>
                ))}
                {/* {users?.length > 0 && !user &&  users?.map((patron) => (
                    <div key={patron._id} className={`border-b-2 border-b-[#413b3b] h-14 font-semibold  flex justify-evenly ${patron.id % 2 ? "bg-[#FBF5FF] text-[#463636] " : "bg-[#f0ddfd] text-[#424242]"}`}>
                        <div className="text-center w-[10%] flex flex-col justify-center">
                            #{patron._id?.substring(patron._id.length - 3)}
                        </div>
                        <div className="text-center w-[30%] flex items-center justify-center">
                            <div className="w-10 h-10 border-2 rounded-full overflow-hidden">
                                <img
                                    src={patron.profilePicture}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="ml-4">
                                <div className="text-lg font-semibold">{patron.username}</div>
                            </div>
                        </div>
                        <div className="text-center w-[25%] flex flex-col justify-center">
                            {patron.email}
                        </div>
                        <div className="text-center w-[25%] flex flex-col justify-center">
                            {new Date(patron.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-center  w-[15%] flex items-center justify-evenly p-2 rounded-lg cursor-pointer">
                           
                            <VisibilityIcon onClick={() => navigate(`/profile?tab=patrons&librarianId=${patron._id}`)} className="text-blue-500" />
                            <Button color="failure" size="xs" onClick={()=>{setShowModal1(true);setLibrarianId(patron._id)}}>
                        < DeleteIcon style={{height:"18px",width:"18px"}}/>
                     
                    </Button>
                        </div>
                    </div>
                ))}

{user?.length > 0 &&  user?.map((patron) => (
                    <div key={patron._id} className={`border-b-2 border-b-[#413b3b] h-14 font-semibold  flex justify-evenly ${patron.id % 2 ? "bg-[#FBF5FF] text-[#463636] " : "bg-[#f0ddfd] text-[#424242]"}`}>
                        <div className="text-center w-[10%] flex flex-col justify-center">
                            #{patron._id?.substring(patron._id.length - 3)}
                        </div>
                        <div className="text-center w-[30%] flex items-center justify-center">
                            <div className="w-10 h-10 border-2 rounded-full overflow-hidden">
                                <img
                                    src={patron.profilePicture}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="ml-4">
                                <div className="text-lg font-semibold">{patron.username}</div>
                            </div>
                        </div>
                        <div className="text-center w-[25%] flex flex-col justify-center">
                            {patron.email}
                        </div>
                        <div className="text-center w-[25%] flex flex-col justify-center">
                            {new Date(patron.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-center  w-[15%] flex items-center justify-evenly p-2 rounded-lg cursor-pointer">
                           
                            <VisibilityIcon onClick={() => navigate(`/profile?tab=patrons&librarianId=${patron._id}`)} className="text-blue-500" />
                            <Button color="failure" size="xs" onClick={()=>{setShowModal1(true);setLibrarianId(patron._id)}}>
                        < DeleteIcon style={{height:"18px",width:"18px"}}/>
                     
                    </Button>
                        </div>
                    </div>
                ))} */}

            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        {/* <img src={img} /> */}
                        {/* < ErrorOutlineIcon style={{ fontSize: "" }} className='h-20 w-20 text-gray-400 dark:text-gray-200 mb-4 mx-auto' /> */}
                        <h3 class="text-lg text-gray-700 font-bold dark:text-gray-400 my-5">Enter the username</h3>

                        <div className="w-[80%] mx-auto text-left  h-16">
                            <FloatingLabel variant="standard" label="Username" className="text-left" type="text" onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-center gap-4'>
                            <Button

                                onClick={() => { addLibrarian(); setShowModal(false); }}
                            >
                                Add User
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
          show={showModal1}
          onClose={() => {setShowModal1(false);}}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              < ErrorOutlineIcon style={{ fontSize: "80px" }} className='h-20 w-20 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this Issue?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button
                  color='failure'
                  onClick={() => {deleteLibrairan();setShowModal1(false)}}
                >
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal1(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>


           

        </div>
    );
}
export default Librarian;








