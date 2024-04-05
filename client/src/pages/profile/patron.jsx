import React from "react";
import { useState, useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import img from "../../Images/img.webp";
import SearchIcon from '@mui/icons-material/Search';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
    { name: 'January', patrons: 400 },
    { name: 'February', patrons: 300 },
    { name: 'March', patrons: 100 },
    { name: 'April', patrons: 200 },
    { name: 'May', patrons: 500 },
    { name: 'June', patrons: 300 },
    // ...add other months with the number of patrons
];
import { useSelector, useDispatch } from "react-redux";
import { getUserStart, getUserFailure, getUserSuccess } from "../../redux/user/userSlice";

const Patron = () => {
    const dispatch = useDispatch();
    const { currentUser, users } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const [user, setUser] = useState();
    const urlParams = new URLSearchParams(window.location.search);
    const librarianId = urlParams.get('librarianId');
    const [name, setName] = useState();
    const [image, setImage] = useState();
    useEffect(() => {
        const fetchPatrons = async () => {
            try {
                dispatch(getUserStart());
                let res;
                if (librarianId) {
                    res = await fetch(`/api/user/getUserPatrons/${librarianId}`);
                }
                else {
                    res = await fetch(`/api/user/getUserPatrons/${currentUser._id}`);
                }

                const data = await res.json();
                if (res.ok) {

                    dispatch(getUserSuccess(data.user.patrons));

                    setName(data.user.username);
                    setImage(data.user.profilePicture);

                }
            } catch (error) {
                dispatch(getUserFailure(error.message));
                console.log(error.message);
            }
        };

        fetchPatrons();
    }, []);

    const [searchTerm, setSearchTerm] = useState();

    const handleSearch = () => {
        // Filter users based on search term
        const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
        // Update state with filtered users
        if (filteredUsers.length == 0) {
            setUser();
        }
        else {
            setUser(filteredUsers);
        }
    };



    return (
        <div className="w-full rounded-xl flex flex-col justify-evenly h-full p-[2%]">
            <div className="w-full  bg-[#a883d8] rounded-xl shadow-xl md:h-[40%] h-[30%] mb-[2%]">
                <div className="h-full  flex pt-2 justify-evenly">
                    <div className="h-full w-[40%]">
                        <div className="md:flex h-[50%] ">
                            <div className="text-black  font-bold px-[4%] py-[3%] w-[48%]">
                                <img
                                    className='h-10 w-10 border-2 object-cover rounded-full'
                                    src={image}
                                    alt=''
                                /><span className="text-[#7b2727]">@{name}</span> Patrons
                            </div>
                            <div className="font-bold my-[10%] md:my-0 p-[2%] bg-white text-black text-sm md:text-xl mb-[2%] mx-auto text-center flex flex-col justify-center w-[80%] md:w-[50%] h-[90%]  rounded-xl shadow-xl">
                                Total Patrons <br></br> {!users ? 0 : users?.length}
                            </div>
                        </div>

                        <div className="h-[50%]  hidden md:block md:mx-[10%] mx-[20%] ">
                            <div className="text-sm md:text-2xl  text-white   md:mb-2 font-bold">
                                Search Patron
                            </div>
                            <div className="w-[90%] h-[30%] flex rounded-xl ">
                                <div className="rounded-l-xl h-full  w-[80%]">
                                    <input type="text" className="rounded-l-xl h-full w-full" onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <div className="rounded-r-xl w-[20%] h-full bg-[#f15757] text-center">
                                    <SearchIcon style={{ color: "white" }} onClick={() => handleSearch()} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=" h-full w-[50%] p-2">
                        <div className="rounded-2xl shadow-xl border-2 md:h-[90%] h-[50%] w-full mx-auto ">
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
                        <div className="h-[50%]  md:hidden md:mx-[10%] flex flex-col justify-center ">
                            <div className="text-sm md:text-2xl  text-white   md:mb-2 font-bold">
                                Search Patron
                            </div>
                            <div className="w-[90%] h-[30%] flex rounded-xl ">
                                <div className="rounded-l-xl h-full  w-[80%]">
                                    <input type="text" className="rounded-l-xl h-full w-full" onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <div className="rounded-r-xl w-[20%] h-full bg-[#f15757] text-center">
                                    <SearchIcon style={{ color: "white" }} onClick={() => handleSearch()} />
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>


            <div className="w-full   rounded-xl shadow-xl font-bold bg-white h-[68%] md:h-[55%] overflow-y-auto">
                <div className=" h-14 flex">
                    <div className="text-center w-[10%] flex flex-col text-[#424242] justify-center">
                        Id
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
                    No Patrons Yet ...
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
                    <div className="text-center w-full flex items-center justify-center p-2 rounded-lg cursor-pointer">
                            <span
                                className="text-lg hidden md:block font-semibold mr-2 cursor-pointer"
                                 // Update this line
                            >
                                Books
                            </span>
                            <VisibilityIcon onClick={() => navigate(`/profile?tab=booksIssued&patronId=${patron._id}`)} className="text-blue-500" />
                    </div>
                    </div>
                </div>
                ))}

                {user?.length > 0 && user?.map((patron) => (<div className={` h-14 border-b-2 border-b-[#413b3b]  flex1 ${patron.id % 2 ? "bg-[#FBF5FF] text-[#463636] " : "bg-[#f0ddfd] text-[#424242]"}`}>
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
                    <div className="text-center w-full flex items-center justify-center p-2 rounded-lg cursor-pointer">
                            <span
                                className="text-lg hidden md:block font-semibold mr-2 cursor-pointer"
                                 // Update this line
                            >
                                Books
                            </span>
                            <VisibilityIcon onClick={() => navigate(`/profile?tab=booksIssued&patronId=${patron._id}`)} className="text-blue-500" />
                    </div>
                    </div>
                </div>
                ))}
                
            </div>

        </div>
    );
}
export default Patron;








