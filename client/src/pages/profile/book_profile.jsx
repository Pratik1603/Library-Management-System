import { useState, useEffect } from "react";

import React from "react";
import AddBookForm from "../../components/addBookForm.jsx";
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "flowbite-react/lib/cjs/components/Button";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Alert, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import {
    bookFetchStart,
    bookFetchSuccess,
    bookFetchFailure,
} from '../../redux/book/bookSlice.jsx';
import Card from "../../components/Card.jsx";
const Book_Profile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { loading, books, error: errorMessage } = useSelector((state) => state.book);
    const [showMore, setShowMore] = useState(true);
    const [total,setTotal]=useState();
    useEffect(() => {
        const fetchBooks = async () => {
            try {

                dispatch(bookFetchStart());
                let res;
                if(currentUser.isOwner){
                     res = await fetch(`/api/book/getbooks`);
                }
                else{
                    res = await fetch(`/api/book/getbooks?userId=${currentUser._id}`);
                }
                
                const data = await res.json();
                if (res.ok) {

                    dispatch(bookFetchSuccess(data.books));
                    
                    setTotal(data.totalBooks);
                    if (data.books.length < 9) {
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
        const startIndex = books.length;
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
    const handleChange = async (e) => {
        const { value } = e.target;
        try {
            dispatch(bookFetchStart());
            let res;
            if(!currentUser.isOwner && value=="all"){
                 res = await fetch(`/api/book/getbooks?userId=${currentUser._id}`);
            }
            else if(!currentUser.isOwner){
                console.log(value);
                 res = await fetch(`/api/book/getbooks?userId=${currentUser._id}&category=${value}`);
            }
            else if(currentUser.isOwner){
                res = await fetch(`/api/book/getbooks?category=${value}`);
            }
            
            const data = await res.json();
            console.log(data);
            if (res.ok) {

                dispatch(bookFetchSuccess(data.books));
                if (data.books.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            dispatch(bookFetchFailure(error.message));
            console.log(error.message);
        }
        setCategory(value);
        console.log(category);
    }

    const [open, setOpen] = useState(false);
    const [openbook, setOpenBook] = useState(false);
    const [searchTerm,setSearchTerm]=useState();
    const dataBook=books;
    const handleSearch=async()=>{
        try {
            
            dispatch(bookFetchStart());
            let res;
            if(currentUser.isOwner){
                res = await fetch(`/api/book/getbooks?searchTerm=${searchTerm}`);
            
            }
            else{
                res = await fetch(`/api/book/getbooks?searchTerm=${searchTerm}&userId=${currentUser._id}`);
            
            }
         
            
            const data = await res.json();
            if (res.ok) {

                dispatch(bookFetchSuccess(data.books));
                console.log(data.books);
                if (data.books.length < 9) {
                    setShowMore(false);
                }
                if(data.books.length==0){
                    dispatch(bookFetchFailure("Sorry, We cant find your book"));
                    dispatch(bookFetchSuccess(dataBook));
                }
            }
        } catch (error) {
            dispatch(bookFetchFailure(error.message));
            dispatch(bookFetchSuccess(dataBook));
            console.log(error.message);
        }
       
    }
    const customTheme = {
        base: 'group flex items-stretch items-center justify-center p-0.5 text-center font-medium relative  focus:outline-none',
    };
    return (
        <div className="w-full flex flex-col justify-evenly  h-full">

            <div className="w-[95%] mx-auto  rounded-xl h-[20%] ">
                <div className="h-full   flex pt-2 justify-evenly">
                    
                    <div className="h-30 text-xl text-white flex font-bold w-full p-[1%] justify-evenly">
    <div className="bg-gradient-to-br from-[#cb51f4] to-[#9059b8] shadow-xl text-center flex flex-col text-xl justify-center rounded-xl md:w-[30%] h-[60%] md:h-full w-[45%]">
        <span>Total Books</span>
        {total}
    </div>
                        <div className="h-[100%]  md:w-[40%] w-[50%] px-[3%]">
                            <div className="text-2xl text-black mb-2 font-bold">
                                Search Books
                            </div>
                            <div className="w-[100%] h-10 flex rounded-xl">
                                 <div className="w-[100%] rounded-l-xl">
                                    <input type="text" className="font-normal focus:outline-none text-sm focus:border-none active:border-none border-none rounded-l-xl p-2 w-full h-full text-black" onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <div className=" md:w-[15%] w-[25%] rounded-r-xl bg-[#FF882F] text-center flex flex-col justify-center text-white">
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
                    <div className="mx-4 md:w-[20%] w-[40%] my-auto ">
                        <Button theme={customTheme} outline gradientDuoTone="pinkToOrange" size="lg" onClick={() => setOpen(true)} >
                            Add Book +
                        </Button>

                    </div>
                </div>



                <div className="rounded-2xl my-4 md:my-0  first-letter:overflow-y-auto overflow-y-scroll h-[80%]">
                    {loading ? (
                        <div className="text-center flex flex-col justify-center h-full  mx-auto">
                            <Spinner size='xl' />
                            <span className='pl-3'>Loading...</span>
                        </div>
                    ) : (
                        <>
                        {!books.length && <div className="h-12 w-[50%] text-2xl font-semibold text-gray-800 my-[10%] mx-auto text-center">No Books Found </div>}
                            <div className="mt-[2%] grid grid-cols-2 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-8   h-72  w-[100%] mx-auto">
                                
                    {books?.length>0 && books?.map((card)=>(
                        // <div key={card._id} className="h-full">
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
            {open ?
                <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center `}>
                    <div className="bg-black bg-opacity-50 w-full h-full absolute" onClick={() => setOpen(false)}></div>
                    <div className="bg-white w-4/5  p-8 relative">
                        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
                            Close
                        </div>
                        <AddBookForm open={open} setOpen={setOpen} />
                    </div>
                </div> :
            ""}

          

        </div>

    )
}
export default Book_Profile;