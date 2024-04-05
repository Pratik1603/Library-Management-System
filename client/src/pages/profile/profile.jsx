import React from "react";
import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import img from "../../Images/girlImg.png";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from "flowbite-react/lib/cjs/components/Button";
import "react-multi-carousel/lib/styles.css";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileSidebar from "../../components/profileSidebar.jsx";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
const Profile1 = () => {
    const {currentUser}=useSelector(state=>state.user);
    const data = [
        { name: 'January', patrons: 400 },
        { name: 'February', patrons: 300 },
        { name: 'March', patrons: 100 },
        { name: 'April', patrons: 200 },
        { name: 'May', patrons: 500 },
        { name: 'June', patrons: 300 },
        // ...add other months with the number of patrons
    ];
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640); 
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="h-full ">
            <div className=" w-full h-full flex  justify-evenly relative">
                <div className={` ${isMobile?"w-[100%] ":"w-[67%]"} w-full my-[1%]`}>
                    <div className="h-[15%]  flex justify-between">
                        <div className=" p-[2%]">
                            <h3 className="text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                                Dashboard
                            </h3>
                            <h3 className="text-sm  tracking-tight  text-gray-700 dark:text-white">
                                Sunday, 05 August 2021
                            </h3>
                        </div>
                        <div className="p-[2%] w-[30%]">
                            {/* <Button theme={customTheme} className="bg-[#FC882F]">
                                <CalendarMonthIcon className="mr-2 h-5 w-5" />
                                Schedule Tasks
                            </Button> */}
                        </div>

                    </div>
                    <div className="h-[20%] md:h-[25%] ">
                        <div className="flex bg-cover bg-[url('https://marketplace.canva.com/EAFlJCUW_7w/1/0/1600w/canva-purple-simple-jamboard-background-D7buWqSWO00.jpg')]  shadow-xl w-[90%] my-2 border-2 rounded-xl h-full mx-auto ">
                            <div className="w-[40%]  h-full relative z-10">
                                <img src={img} className="object-fit h-[118%] md:h-[125%] w-[90%] rounded-l-xl -mt-[30%] md:-mt-[14%]"/>
                            </div>
                            <div className="w-[60%] flex flex-col justify-center p-[4%] h-full">
                                <h5 className=" text-lg md:text-xl font-semibold  text-white">Hello, {currentUser?.username}</h5>
                                <div className="text-[8px] md:text-xs   text-[#dbd9d9]  w-[70%]">When you work online or browse the internet you deal with a lot of text such as a website address URL, meeting links, passwords, and so on.</div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[25%] mx-auto w-[90%] my-[3%] flex justify-between">
                        <div className="w-[40%] shadow-xl h-[80%] bg-white rounded-xl my-[2%]">
                            <div className="text-center font-bold">
                                {!currentUser.isOwner && !currentUser.isLibrarian && "Reading Score"}
                                {(currentUser.isOwner || currentUser.isLibrarian) && "Work Score"}
                            </div>
                        <CircularProgressbar value={70} text={"70%"} strokeWidth={10} className="w-full h-[70%] my-1" />
                        </div>
                        <div className="w-[56%] h-[80%] my-[2%] flex justify-evenly">
                            <div className="w-[50%] shadow-xl rounded-xl bg-white h-full">

                            </div>
                            <div className="w-[45%]  h-full flex flex-col justify-between">
                                <div className="w-full h-[48%]  bg-white flex shadow-xl rounded-xl justify-evenly">
                                    <div className="w-[45%] h-full flex flex-col justify-center">
                                        <div className="bg-[#fae5c6] text-[#C4A884]   rounded-full w-[90%] md:w-[70%] mx-auto h-[70%] flex flex-col justify-center ">
                                            <PeopleOutlineIcon style={{ margin: "auto"}} />
                                        </div>
                                    </div>
                                    <div className="w-[45%] h-full flex flex-col justify-center ">
                                        <div className=" w-full text-xs md:text-sm">Team</div>
                                        <div className="  w-full font-bold text-lg md:text-2xl text-[#906eb1]">1+</div>
                                    </div>
                                </div>
                                <div className="w-full h-[48%]  bg-white flex shadow-xl rounded-xl justify-evenly">
                                    <div className="w-[45%] h-full flex flex-col justify-center">
                                        <div className="bg-[#fae5c6] text-[#C4A884]   rounded-full w-[90%] md:w-[70%] mx-auto h-[70%] flex flex-col justify-center ">
                                            <PeopleOutlineIcon style={{ margin: "auto"}} />
                                        </div>
                                    </div>
                                    <div className="w-[45%] h-full flex flex-col justify-center ">
                                        <div className=" w-full text-xs md:text-sm">Team</div>
                                        <div className="  w-full font-bold text-lg md:text-2xl text-[#906eb1]">1+</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                    </div>

                    <div className="shadow-xl bg-white w-[90%] mx-auto h-[25%] rounded-xl">
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

                                <Tooltip />
                                <Area type="monotone" dataKey="patrons" stroke="#f7964c" fillOpacity={1} fill="url(#colorPatrons)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
              
                    {isMobile && (
                        <div
                            className={` fixed top-2 right-2 z-50 ${isOpen ? 'w-[100%]  h-screen' : 'w-10 '} transition-all duration-300 ease-in-out`}
                            
                        >
                            {isOpen ? 
                            <div className="w-full h-full">
                                <ProfileSidebar/> 
                                <div className="fixed top-4 right-4"> 
                                     <CloseIcon onClick={toggleDrawer}/>
                                 </div></div> 
                           : <MenuIcon onClick={toggleDrawer}/>}
                        </div>
                    )}
                  
                    {!isMobile && (<div className="w-[40%] ">
                        <ProfileSidebar/>
                   </div>)}
                   
              
            </div>
        </div>
    )


}
export default Profile1;








