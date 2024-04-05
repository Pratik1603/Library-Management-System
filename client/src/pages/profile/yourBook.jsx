import React from "react";
import { useState, useEffect } from "react";

import AddBookForm from "../../components/addBookForm.jsx";
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "flowbite-react/lib/cjs/components/Button";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import {
    bookFetchStart,
    bookFetchSuccess,
    bookFetchFailure,
} from '../../redux/book/bookSlice.jsx';
import Card from "../../components/Card.jsx";
export const YourBook=()=>{
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { loading, books, error: errorMessage } = useSelector((state) => state.book);
    const [showMore, setShowMore] = useState(true);
    const [myBook,setBook]=useState();
    const urlParams = new URLSearchParams(window.location.search);
const patronId = urlParams.get('patronId');
const [name,setName]=useState();
const [image,setImage]=useState();
console.log(patronId);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                dispatch(bookFetchStart());
                let res;
                if(patronId){
                    res = await fetch(`/api/user/getUserBooks/${patronId}`);
                }
                else{
                    res = await fetch(`/api/user/getUserBooks/${currentUser._id}`);
                }
                
                const data = await res.json();
                if (res.ok) {

                    dispatch(bookFetchSuccess(data.user.books));
                    console.log(data);
                    setName(data.user.username);
                    setBook(data.user.books);
                    setImage(data.user.profilePicture);
                    if (data.user.books.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                dispatch(bookFetchFailure(error.message));
                console.log(error.message);
            }
        };

        fetchBooks();

    }, [currentUser._id]);
    
    const [category, setCategory] = useState("");
    const handleShowMore = async () => {
        const startIndex = userBooks.length;
        try {
            dispatch(bookFetchStart());
            const res = await fetch(
                `/api/book/getbooks?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                const updatedBooks = [...books, data];
                dispatch(updateSuccess(updatedBooks));

                if (data.books.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleChange = (e) => {
        const { value } = e.target;
        let filteredBooks;
       if(value==""){
         filteredBooks = books;
       }
       else{
         filteredBooks = books.filter(book => book.category === value);
       }
       
        setBook(filteredBooks);
        console.log(filteredBooks);
        setCategory(value);
        console.log(category);
    }

  
    const [searchTerm,setSearchTerm]=useState();
   
    const handleSearch=async()=>{
        let filteredBooks;
        if(searchTerm==""){
          filteredBooks = books;
        }
        else{
          filteredBooks = books.filter(book => book.name === searchTerm);
        }
        
        setBook(filteredBooks);
       
    }
    const customTheme = {
        base: 'group flex items-stretch items-center justify-center p-0.5 text-center font-medium relative  focus:outline-none',
    };
    return(
        <div className="w-full flex flex-col justify-evenly  h-full">
            
<div className="w-[95%] mx-auto  rounded-xl h-[20%] ">
                <div className="h-full   flex pt-2 justify-evenly">
                    
                    <div className="h-30 text-xl text-white flex font-bold w-full p-[1%] justify-around">
                    <div className="text-black  w-[20%]">
                    <img
              className='h-10 w-10 border-2 object-cover rounded-full'
              src={image}
              alt=''
            /><span className="text-[#4b9af5]">@{name}</span> Libraray
                    </div>
    <div className="bg-gradient-to-br from-[#a61cd3] to-[#7a13c4] shadow-xl text-center flex flex-col text-xl justify-center rounded-xl w-[25%]">
        <span>Total Books</span>
        {myBook?.length}
    </div>
    

                        <div className="h-[100%] w-[40%] md:w-[40%] px-[3%]">
                            <div className="md:text-2xl text-xl text-black mb-2 font-bold">
                                Search Books
                            </div>
                            <div className="w-[100%] h-10 flex rounded-xl">
                                 <div className="w-[70%] md:w-[100%] rounded-l-xl">
                                    <input type="text" className="font-normal focus:outline-none text-sm focus:border-none active:border-none border-none rounded-l-xl p-2 w-full h-full text-black" onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <div className="w-[30%] md:w-[15%] rounded-r-xl bg-[#FF882F] text-center flex flex-col justify-center text-white">
                                    <SearchIcon onClick={()=>handleSearch()} style={{ fontSize: "35px", margin: "auto" }} />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <div className=" h-[74%] mx-auto relative rounded-2xl  w-[95%]  ">
                <div className=" h-12 flex justify-between ">
                <div className="md:w-[30%] w-[50%] my-auto h-[70%] flex">
                    <div className="bg-[#FF882F] text-white rounded-l-xl w-[40%] h-10 md:text-xl text-sm font-semibold p-1 flex flex-col justify-center text-center">Category</div>
                        <select className="border-none h-10 w-[60%] rounded-r-xl md:text-lg text-sm text-center cursor-pointer" onChange={handleChange}>
                            <option value="">
                                All
                            </option>
                            <option value="fiction">
                                Fiction
                            </option>
                            <option value="non-fiction">   
                                Non-Fiction
                            </option>
                            <option value="romance">
                                Romance
                            </option>
                            <option value="sci-fi">
                                Sci-Fi
                            </option>
                        </select>
                    </div>
                    
                   
                </div>




                <div className="rounded-2xl  first-letter:overflow-y-auto overflow-y-scroll h-[80%]">
                    {loading ? (
                        <div className="text-center flex flex-col justify-center h-full  mx-auto">
                            <Spinner size='xl' />
                            <span className='pl-3'>Loading...</span>
                        </div>
                    ) : (
                        <>
                            <div className="mt-[2%] grid grid-cols-2 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-8   h-72  w-[100%] mx-auto">
                    {myBook?.length>0 && myBook?.map((card)=>(
                       
                        <Card card={card}/>
                    
                    ))}
                    
                </div>
                            <div className="text-center">
                                {showMore && (
                                    <button
                                        onClick={handleShowMore}
                                        className='w-full text-teal-500 self-center text-sm py-7'
                                    >
                                        Show more
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                </div>
            </div>
           

          

        </div>

    )
}