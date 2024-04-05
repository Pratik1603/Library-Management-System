import { useState } from "react";
// import Card from "../../components/Card.jsx";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import "./Home.css";
import Footer from '../../components/Footer.jsx';
import Navbar from '../../components/Navbar.jsx';
import SearchIcon from '@mui/icons-material/Search';
import img from "../../Images/book1.png";
import img1 from "../../Images/book2.jpeg";
import img2 from "../../Images/book3.jpg";
import img3 from "../../Images/book4.jpeg";
import img4 from "../../Images/libgirl.avif";
import img6 from "../../Images/designImgg.png";
import MoneyIcon from '@mui/icons-material/Money';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import { Button } from "flowbite-react/lib/cjs/components/Button/Button.js";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
 const navigate=useNavigate();
 const handleClick=()=>{
  if(currentUser){
    navigate('/profile?tab=profile');
  }
  else{
    navigate('/login');
  }
 }
  return (
    <div className=" bg-[#f6edff]">
      <Navbar/>
      <div className='flex justify-evenly  h-[95vh] md:h-[90vh] '>
        {/* <img src={img10} className=" absolute w-full h-full"/> */}

        <div className="h-[90%] my-[5%] md:my-[0%] w-[95%] md:flex">

          <div className=" h-[60%] md:h-full  md:w-[50%] w-full md:m-[3%] mx-auto ">
            <div className=" w-full flex text-orange-500 font-bold flex-col justify-center h-[8%] md:my-[2%] my-[1%]">
              LIBRARY MANAGEMENT SYSTEM
            </div>
            <div className=" md:text-5xl text-3xl flex flex-col justify-center font-bold w-full  md:h-[35%] h-[30%] md:my-[2%] my-[2%] leading-[1.2]">
              BOOKS FOR YOUR PROFESSIONAL AND PERSONAL GROWTH
            </div>
            <div className=" w-full flex flex-col justify-center md:h-[18%] h-[20%] md:my-[2%] my-[3%]">
              Our LMS is designed to empower both educators and learners by
               offering a comprehensive platform for education. With user-friendly 
               interfaces, interactive features.


            </div>
            <div className=" w-full flex gap-5 h-[8%] md:my-[2%] my-[2%]">
              <Button className="md:w-[40%] w-[45%]" gradientDuoTone="pinkToOrange" onClick={()=>handleClick()}>
                Start Reading Books
              </Button>
              <Button outline gradientDuoTone="greenToBlue" onClick={()=>navigate('/books')}>
                Browse Books
              </Button>
            </div>
            <div className=" w-full flex flex-col font-semibold justify-center h-[20%] md:my-[2%] my-[1%]">
              <div><TaskAltIcon style={{ color: "green", marginRight: "10px" }} />Issue Books</div>
              <div><TaskAltIcon style={{ color: "green", marginRight: "10px" }} />Manage Books</div>
              <div><TaskAltIcon style={{ color: "green", marginRight: "10px" }} />Anytime, anywhere learning</div>
            </div>
          </div>

          <div className="md:h-full md:w-[50%] md:m-[3%]  h-[40%] w-full ">
              <img src={img} className="h-full md:h-[90%] mx-auto md:my-[10%]"/>  
          </div>

        </div>

      </div>
      <div className=" h-[100vh] p-[2%] relative flex flex-col gap-4 ">
        <div className="w-full text-orange-500 font-bold text-center">
          FEATURED
        </div>
        <div className=" z-10 text-3xl  md:text-4xl text-center  h-[20%] md:h-[25%] md:w-[50%] w-[90%] font-bold mx-auto">
          TRANSFORM YOUR LIFE WITH WISDOM AND INSIGHT FOUND IN BOOKS
        </div>
        <div className="absolute top-[13%] md:top-[27%] bg-[#dfc9f8b0] h-[50%] md:h-[45%] w-[101%] m-[-3%] ">

        </div>
        <div className=" z-10 h-[60%] md:h-[70%]   md:flex justify-evenly">
          <div className="hidden w-[22%] md:block  h-full my-auto">
            <div className="h-[80%] ">
              <img src={img2} className="w-full h-full"/>
            </div>
            <div className=" h-[20%] p-[2%]">
              <div className="font-bold">
                The Women
              </div>
              <div className="w-[20%] border-2 border-orange-500"></div>
              <div className="text-gray-600">
                KRISTIN HANNAH
              </div>
            </div>
          </div>
          <div className="md:w-[22%] w-[60%] mx-auto md:mx-0 h-full my-auto">
            <div className="h-[80%] border-2">
              <img src={img1} className="w-full h-full"/>
            </div>
            <div className=" h-[20%] p-[2%]">
              <div className="font-bold">
                ATOMIC HABITS
              </div>
              <div className="w-[20%] border-2 border-orange-500"></div>
              <div className="text-gray-600">
                JAMES CLEAR
              </div>
            </div>
          </div>
          <div className="hidden w-[22%] md:block  h-full my-auto">
            <div className="h-[80%] border-2">
              <img src={img3} className="w-full h-full"/>
            </div>
            <div className=" h-[20%] p-[2%]">
              <div className="font-bold">
                Hung Lou Meng Book 2
              </div>
              <div className="w-[20%] border-2 border-orange-500 "></div>
              <div className="text-gray-600">
                  CAO XUEQUIN
              </div>
            </div>
          </div>


        </div>
        <Button className="w-[40%] md:w-[20%] h-12 mx-auto" outline gradientDuoTone="pinkToOrange" onClick={()=>navigate('/books')} >
          Browse Books
        </Button>
      </div>

      <div className='flex justify-evenly h-[100vh] '>
        {/* <img src={img10} className=" absolute w-full h-full"/> */}

        <div className="h-[80%]  my-auto  w-[95%] md:flex">

          <div className=" h-[60%] flex flex-col justify-evenly  md:h-full  md:w-[50%] w-full md:m-[3%] mx-auto ">
            <div className=" w-full text-orange-500 font-bold flex flex-col justify-center h-[8%] md:my-[1%] my-[3%]">
              BENEFITS
            </div>
            <div className=" md:text-5xl text-4xl flex flex-col justify-center font-bold w-full   md:h-[50%] h-[30%] md:my-[1%] my-[1%] leading-[1.2]">
              FIND YOUR NEXT GREAT READ AND GAIN NEW PERSPECTIVES
            </div>
            <div className=" w-full flex flex-col justify-center md:h-[18%] h-[24%] md:my-[1%] my-[3%]">
            Discover the joy of reading and expand your horizons with our
             curated selection of books on our Learning Management System (LMS). 


            </div>
            <div className=" w-full flex gap-5 h-[8%] md:my-[1%] my-[3%]">
              <Button className="md:w-[40%] w-[45%]" outline gradientDuoTone="pinkToOrange" onClick={()=>handleClick()} >
                Start Reading Books
              </Button>

            </div>

          </div>

          <div className=" md:h-[80%]  my-auto md:w-[50%] md:m-[3%] h-[50%] w-full ">
            <div className=" flex w-full h-[50%]">
              <div className=" w-[50%] h-full">
                <div className=" w-full h-[40%]">
                  <div className="border-2 rounded-full w-14 h-14 m-[2%] text-black shadow-2xl p-[2%] bg-[#f4b266]">
                        <MoneyIcon style={{fontSize:"45px"}} />
                  </div>
                </div>
                <div className=" p-[2%]  w-full h-[20%]">
                  AFFORDABILITY
                </div>
                <div className=" text-sm w-full h-[40%] p-[1%]">
                With our cost-effective solution, you can enjoy all the benefits at affordable rates

                </div>
              </div>

              <div className=" w-[50%] h-full">
                <div className=" w-full h-[40%]">
                  <div className="border-2 rounded-full w-14 h-14 text-black shadow-2xl p-[2%] bg-[#f4b266] m-[2%]">
                  <ManageAccountsIcon style={{fontSize:"45px"}} />
                  </div>
                </div>
                <div className=" p-[2%] w-full h-[20%]">
                  MANAGEMNET
                </div>
                <div className=" text-sm w-full h-[40%] p-[1%]">
                  Proper management in managing books , has a vast team of librarians.
                </div>
              </div>


            </div>
            <div className=" flex w-full h-[50%]">
              <div className=" w-[50%] h-full">
                <div className=" w-full h-[40%]">
                  <div className="border-2 rounded-full w-14 h-14 text-black shadow-2xl p-[2%] bg-[#f4b266] m-[2%] ">
                    <SearchIcon style={{fontSize:"45px"}} />
                  </div>
                </div>
                <div className=" p-[2%] w-full h-[20%]">
                  DISCOVERABLE
                </div>
                <div className=" text-sm w-full h-[40%]">
                  All varieties of books available ,as all types of books available under one category
                </div>
              </div>

              <div className=" w-[50%] h-full">
                <div className=" w-full h-[40%]">
                  <div className="border-2 rounded-full w-14 h-14 text-black shadow-2xl p-[2%] bg-[#f4b266] m-[2%] ">
                    <PhonelinkIcon style={{fontSize:"45px"}} />
                  </div>
                </div>
                <div className=" p-[2%] w-full h-[20%]">
                  CONVENIANCE
                </div>
                <div className=" text-sm w-full h-[40%]">
                  Our LMS is easy to operate , and has smooth functioning among all the stakeholders
                </div>
              </div>


            </div>

          </div>

        </div>

      </div>

      <div className='flex justify-evenly  h-[100vh] '>
        {/* <img src={img10} className=" absolute w-full h-full"/> */}

        <div className="h-[90%] my-auto  w-[95%] md:flex">
          <div className=" md:mx-[3%] md:h-[80%]  md:w-[50%] md:my-auto h-[40%] w-full ">
          <img src={img4} className="w-[70%] h-[95%] mx-auto md:mx-0 rounded-xl"/>
          </div>
          <div className=" h-[65%] flex flex-col justify-evenly  md:mx-[3%]  md:h-[80%]  md:w-[50%] w-full md:my-auto mx-auto ">
            <div className=" w-full text-orange-500 font-bold flex flex-col justify-center h-[8%]  ">
              FEATURES
            </div>
            <div className=" md:text-5xl text-4xl flex flex-col justify-center font-bold w-full  md:h-[45%] h-[30%] md:my-[3%] leading-[1.2]">
             FIND YOUR NEXT GREAT READ WITH OUR EASY TO USE PLATFORMS
            </div>
            <div className=" w-full  h-[18%] md:my-[3%] ">
            Discover your next captivating read effortlessly with our user-friendly platforms.
             Whether you prefer to browse on your computer, tablet, or smartphone.
            </div>

            <div className=" w-full flex flex-col font-semibold justify-center h-[20%] md:my-[2%]  ">
              <div><TaskAltIcon style={{ color: "green", marginRight: "10px" }} />Smooth functioning</div>
              <div><TaskAltIcon style={{ color: "green", marginRight: "10px" }} />Easy to issue</div>
              <div><TaskAltIcon style={{ color: "green", marginRight: "10px" }} />Properly managed</div>
            </div>
          </div>



        </div>

      </div>


      <div className='flex justify-evenly bg-[#dfc9f8b0] h-[100vh] '>
        {/* <img src={img10} className=" absolute w-full h-full"/> */}

        <div className="h-[95%] my-auto  w-[95%] md:flex">

          <div className=" h-[60%] flex flex-col justify-evenly  md:mx-[3%]  md:h-[80%]  md:w-[50%] w-full md:my-auto mx-auto ">
            <div className=" w-full text-orange-500 font-bold *:flex flex-col justify-center h-[8%]  my-[1%]">
              POPULAR AUTHORS
            </div>
            <div className=" md:text-5xl text-4xl flex flex-col justify-center font-bold w-full  md:h-[50%] h-[30%] md:my-[1%] my-[1%] leading-[1.5]">
             NEW BOOKS ADDED REGULARLY TO KEEP OUR COLLECTION FRESH
            </div>
            <div className=" w-full flex flex-col justify-center  h-[14%] md:my-[1%] my-[1%]">
             Books are added frequently , and all popular authors book are present


            </div>
            <div className=" w-full flex gap-5 h-[10%] md:my-[2%] my-[1%]">
              <Button className="md:w-[40%] w-[45%]" gradientDuoTone="pinkToOrange" outline onClick={()=>handleClick()}>
                Start Reading Books
              </Button>

            </div>


          </div>

          <div className=" md:mx-[3%] md:h-[80%]  md:w-[50%] md:my-auto h-[40%] w-full ">
            <img src={img6} className="w-[105%] h-[105%]"/>
          </div>



        </div>

      </div>

      <div className='flex justify-evenly   h-[100vh] '>
        {/* <img src={img10} className=" absolute w-full h-full"/> */}

        <div className="h-[95%] flex flex-col justify-evenly  my-auto  w-[95%] ">
          <div className=" w-full text-orange-500 font-bold flex flex-col justify-center text-center h-[8%]  ">
            TESTIMONIALS
          </div>
          <div className=" md:text-4xl  text-3xl flex flex-col justify-center font-bold w-[90%] text-center md:h-[20%]  h-[20%] mx-auto  ">
            REAL SUCCESS STORIES FROM SATISFIED CUSTOMERS
          </div>
          <div className=" w-[70%] mx-auto text-center flex flex-col justify-center  h-[5%] ">
            Our ebooks are perfectly created to provide you Our ebooks


          </div>
          <div className=" bg-[#efe3fc]  w-[90%] h-[50%] mx-auto my-[2%]  ">
            <div className=" h-[95%] w-[95%] mx-auto relative my-[1%] md:flex">
              <div className=" md:w-[40%] w-full">
                <img src={img4} className="w-[70%] rounded-xl h-[90%] mx-auto my-[6%]"/>
              </div>
              <div className="flex flex-col justify-evenly p-[1%] md:w-[60%] w-full ">
                <div className=" h-[20%]">
                  <div className="font-semibold">
                    Alina Jimey
                  </div>
                  <div className="text-gray-600">
                    Customer
                  </div>
                </div>
                <div className=" h-[20%] ">
                  <div className="flex   ">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className="h-4 w-4 cursor-pointer text-yellow-400 "

                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"

                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className=" h-[55%] text-2xl font-semibold">
                  "Our ebooks are perfectly created to provide you Our ebooks
                  Our ebooks are perfectly created to provide you Our ebooks"

                </div>
                <div className="absolute top-2 md:right-0 right-[-10%] flex justify-evenly md:w-[15%] w-[25%] h-[20%]">
                  <div className=" text-center w-[35%] rounded-full h-[90%]">
                    <ArrowBackIcon style={{ fontSize: "40px", marginTop: "5%" }} />
                  </div>
                  <div className=" text-center w-[35%] rounded-full h-[90%]">
                    <ArrowForwardIcon style={{ fontSize: "40px", marginTop: "5%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>

      <Footer />
    </div>



  )

}

export default Home

