import { useState, useEffect } from "react";
import React from "react";
import Footer from '../../components/Footer.jsx';
import Navbar from '../../components/Navbar.jsx';
import { Button } from "flowbite-react/lib/cjs/components/Button/Button.js";
import { Modal } from "flowbite-react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CommentSection from "../../components/commentSection.jsx";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import img from "../../Images/clock.png";
import {
    bookFetchStart,
    bookFetchSuccess,
    bookFetchFailure,
} from '../../redux/book/bookSlice.jsx';
import Card from "../../components/Card.jsx";


const BookPage = () => {
    const [rating, setRating] = useState(0); // State to hold the selected rating
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const { bookSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const { books, error: errorMessage } = useSelector((state) => state.book);
    const [error, setError] = useState(false);
    const [book, setBook] = useState(null);
    
    const { currentUser } = useSelector((state) => state.user);
    const [period,setPeriod]=useState(1);
    const [amount,setAmount]=useState(0);
    const handleCreateIssue = async (bookId, libId,amnt) => {
        try {
            
            const res = await fetch(`/api/issue/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookId: bookId,
                    librarianId: libId,
                    patronId: currentUser, // Assuming currentUser is defined somewhere
                    isApproved: false,
                    issuePeriod: period,
                    issueClosed: false,
                    amountPaid: amnt,
                    
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
                return;
            }
    
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    
    useEffect(() => {
        const handleChange = async (e) => {

            try {
                dispatch(bookFetchStart());

                const res = await fetch(`/api/book/getbooks?category=${book?.category}&limit=5`);


                const data = await res.json();
                if (res.ok) {

                    dispatch(bookFetchSuccess(data.books));
                    console.log(books);
                    if (data.books.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                dispatch(bookFetchFailure(error.message));
                console.log(error.message);
            }

        }
        handleChange();
    }, [book])

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/book/getbooks?slug=${bookSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setBook(data.books[0]);
                    console.log(data.books[0]);
                    setRating(data.books[0].ratingOver);
                    // console.log(data.books[0].rating);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchBook();

    }, [bookSlug]);

    console.log(rating);






    return (
        <div className="  bg-gradient-to-br  from-[#f6edff] to-[#f5eefd] ">
            <Navbar />
            <div className="px-[2%] my-[2%]  h-[90vh]">
                <div className=" h-[45%] flex justify-evenly">
                    <div className="w-[40%] md:w-[25%] flex rounded-xl flex-col justify-center">
                        <img src={book?.imageUrl} className="rounded-xl w-full md:w-[70%] h-[90%]  mx-auto" />
                    </div>
                    <div className="w-[60%]  md:w-[70%]">
                        <div className=" font-bold text-2xl p-2 w-full h-[20%]">
                            {book?.name}
                        </div>
                        <div className="  font-bold text-2xl px-2 w-full h-[10%] flex justify-between">
                            <div className=" flex items-center space-x-1">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`h-4 w-4 cursor-pointer ${index < rating ? 'text-yellow-300' : 'text-gray-300'
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"

                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="text-xs font-semibold text-cyan-800 bg-cyan-100 dark:bg-cyan-200 dark:text-cyan-800 rounded px-1">{`${rating}/5`}</span>
                            </div>

                        </div>
                        <div className=" h-[14%] flex justify-evenly w-full md:w-[60%]">
                            <div className=" w-[30%]">
                                <div className="text-sm font-semibold text-orange-700">
                                    Author -
                                </div>
                                <div className="text-xs font-semibold">
                                    {book?.author}
                                </div>
                            </div>
                            <div className=" w-[30%]">
                                <div className="text-orange-700 font-semibold text-sm">
                                    Publisher -
                                </div>
                                <div className="text-xs font-semibold">
                                    {book?.publisher}
                                </div>
                            </div>
                            <div className=" w-[30%]">
                                <div className=" text-orange-700 font-semibold text-sm">
                                    Date -
                                </div>
                                <div className="text-xs font-semibold">
                                    {book?.date}
                                </div>
                            </div>
                        </div>
                        <div className="px-[1%]  m-[1%] rounded-xl bg-[#f3ecfc]  overflow-hidden overflow-y-scroll py-[1%] text-sm h-[39%]" dangerouslySetInnerHTML={{ __html: book && book?.description }}>

                        </div>
                        <div className=" h-[18%]  flex justify-between">
                            <div className="mx-[2%] flex flex-col justify-center text-xl md:text-2xl font-bold ">
                                $ {book?.price}/wk
                            </div>

                            <div className=" w-[60%] md:w-[40%] h-[60%] md:h-full my-auto flex justify-evenly">
                               
                                <Button gradientDuoTone='purpleToBlue' onClick={() => setShowModal(true)}
                                >
                                    Issue Book
                                </Button>
                                <div >
                                    <FavoriteBorderIcon style={{ margin: "auto", marginTop: "30%" }} />
                                </div>

                            </div>
                        </div>


                    </div>
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
                            <img src={img} />
                            {/* < ErrorOutlineIcon style={{ fontSize: "" }} className='h-20 w-20 text-gray-400 dark:text-gray-200 mb-4 mx-auto' /> */}
                            <h3 class="text-lg text-gray-700 font-bold dark:text-gray-400 my-5">Select the issue Period</h3>

                            <div class="flex justify-center items-center my-2 ">
                                <label for="issue-period" class="mr-2">Select Period </label>
                                <select id="issue-period" class="p-2 rounded-md border text-center border-gray-300 dark:border-gray-600" onChange={(e)=>{setPeriod(e.target.value);setAmount(e.target.value*(book?.price))}}>
                                    <option value="1">1 week</option>
                                    <option value="2">2 weeks</option>
                                    <option value="3">3 weeks</option>
                                    <option value="4">4 weeks</option>
                                </select>
                            </div>
                            <div class="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Total: $ {period*(book?.price)}</div>

                            <div className='flex justify-center gap-4'>
                                <Button

                                  onClick={() => {handleCreateIssue(book._id,book.userId,period*book?.price);setShowModal(false);}}
                                >
                                    Request for Issue
                                </Button>
                                <Button color='gray' onClick={() => setShowModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className="flex   h-[55%]">
                    <div className="p-[2%] flex flex-col justify-evenly w-full md:w-[70%] ">
                        <div className="mb-[2%] border-b-4 border-orange-500 py-[1%] w-[40%] md:w-[20%] text-xl font-bold">
                            Book Details
                        </div>
                        <div className="flex  border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold  w-[30%]">
                                Book Title
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%]  w-[70%]">
                                {book?.name}
                            </div>
                        </div>
                        <div className="flex border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold  w-[30%]">
                                Author
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%]  w-[70%]">
                                {book?.author}
                            </div>
                        </div>
                        <div className="flex border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold  w-[30%]">
                                Book Publisher
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%] w-[70%]">
                                {book?.publisher}
                            </div>
                        </div>
                        <div className="flex border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold  w-[30%]">
                                Published Date
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%] w-[70%]">
                                {book?.date}
                            </div>
                        </div>
                        <div className="flex border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold  w-[30%]">
                                Total Copies
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%]  w-[70%]">
                                {book?.totalCopies}
                            </div>
                        </div>
                        <div className="flex border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold  w-[30%]">
                                Category
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%] ">
                                <div className="p-2  bg-orange-400 text-white font-semibold   h-[80%] flex flex-col justify-center text-center rounded-xl">
                                    {book?.category}
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="w-[30%] border-2">

                    </div> */}

                </div>
            </div>

            <CommentSection bookId={book?._id} />
            <div className="p-[2%]">
                <div className="text-2xl font-bold">
                    Similar Books
                </div>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-5 gap-8   h-64  w-[100%] mx-auto">
                    {books?.length > 0 && books?.map((card) => (

                        <Card card={card} />

                    ))}

                </div>
                <div className="text-center w-full  ">

                    <button
                        onClick={() => navigate('/books')}
                        className='w-full text-teal-500  self-center text-sm py-1'
                    >
                        Show more
                    </button>

                </div>

            </div>

            <Footer />
        </div>



    )

}


export default BookPage;

