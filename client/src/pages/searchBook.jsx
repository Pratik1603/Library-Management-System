import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Alert, Spinner } from 'flowbite-react';
import Navbar from '../components/Navbar.jsx';
import { FloatingLabel } from 'flowbite-react';
import FilterAltIcon from '@mui/icons-material/FilterAlt.js';
import {
  bookFetchStart,
  bookFetchSuccess,
  bookFetchFailure,
} from '../redux/book/bookSlice.jsx';
import Card from '../components/Card.jsx';
export default function Search() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const handleShowMore = async () => {
    const startIndex = userBooks.length;
    try {
      dispatch(bookFetchStart());
      const res = await fetch(
        `/api/book/getbooks?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        const updatedBooks = [...books, data];
        dispatch(updateSuccess(updatedBooks));

        if (data.books.length <= 12) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const [category, setCategory] = useState("all");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [name, setName] = useState("");
  const { loading, books, error: errorMessage } = useSelector((state) => state.book);
  const [showMore, setShowMore] = useState(true);
  const navigate = useNavigate();
  const [isOpen,setOpen]=useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 720);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(bookFetchStart());
        const res = await fetch(`/api/book/getbooks`);
        const data = await res.json();
        if (res.ok) {

          dispatch(bookFetchSuccess(data.books));
          if (data.books.length <= 12) {
            setShowMore(false);
          }
        }
      } catch (error) {
        dispatch(bookFetchFailure(error.message));
        console.log(error.message);
      }
    };

    fetchBooks();

  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("l");
    try {
      dispatch(bookFetchStart());
      let url = '/api/book/getbooks';

      const queryParams = [];
      if (category !== "all") {
        queryParams.push(`category=${category}`);
      }
      if (name != "") {
        queryParams.push(`searchTerm=${name}`);
      }
      if (author !== "") {
        queryParams.push(`author=${author}`);
      }
      if (publisher !== "") {
        queryParams.push(`publisher=${publisher}`);
      }

      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }

      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        dispatch(bookFetchSuccess(data.books));
        setShowMore(data.books.length >= 12);
      }
    } catch (error) {
      dispatch(bookFetchFailure(error.message));
      console.log(error.message);
    }
  }
  console.log(books);
  return (
    <div>
      <Navbar />

      <div className='flex flex-col relative  bg-[#f6edff] h-[90vh]  md:flex-row'>
        <div className="absolute right-[2%]  top-[2%] ">

          {isSmallScreen && <Button size="sm" onClick={() => setOpen(!isOpen)} >
            <FilterAltIcon />Filter
          </Button>}
        </div>
        {isOpen && isSmallScreen?
        <div className='px-7 opacity-95 absolute right-[2%] top-[6%] bg-white m-[2%] shadow-xl text-gray-800 rounded-xl border-b  md:border-r h-[50%] w-[50%]  '>
        <div className='my-[12%] font-bold text-xl'>
          Filters
        </div>
        <form className='flex flex-col gap-8'>
          <div className='flex flex-col items-center gap-6'>
            <FloatingLabel onChange={(e) => setName(e.target.value)} variant="standard" label="Book Name" name="name" className="text-gray-800" type="text"
            />

            <FloatingLabel onChange={(e) => setAuthor(e.target.value)} variant="standard" label="Author" name="author" className="text-gray-800" type="text"
            />
            <FloatingLabel onChange={(e) => setPublisher(e.target.value)} variant="standard" label="Publisher" name="publisher" className="text-gray-800" type="text"
            />
            <div className='flex justify-evenly gap-5'>


              <label htmlFor="category" className="block text-gray-800 text-lg font-bold mb-2">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-[60%] px-3 py-2 border text-black text-sm rounded-md focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Category</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="mystery">Mystery</option>
              </select>
            </div>

            <Button type='submit' onClick={handleSubmit} outline gradientDuoTone='purpleToPink'>
              Apply Filters
            </Button>
            {errorMessage &&
              <Alert color='failure'>
                {errorMessage}

              </Alert>}
          </div>
        </form>

      </div>:""}

            
      {!isSmallScreen && <div className='px-7 bg-white m-[2%] shadow-xl text-gray-800 rounded-xl border-b border-2 md:border-r h-[90%] w-[30%]  '>
        <div className='my-[12%] font-bold text-xl'>
          Filters
        </div>
        <form className='flex flex-col gap-8'>
          <div className='flex flex-col items-center gap-6'>
            <FloatingLabel onChange={(e) => setName(e.target.value)} variant="standard" label="Book Name" name="name" className="text-gray-800" type="text"
            />

            <FloatingLabel onChange={(e) => setAuthor(e.target.value)} variant="standard" label="Author" name="author" className="text-gray-800" type="text"
            />
            <FloatingLabel onChange={(e) => setPublisher(e.target.value)} variant="standard" label="Publisher" name="publisher" className="text-gray-800" type="text"
            />
            <div className='flex justify-evenly gap-5'>


              <label htmlFor="category" className="block text-gray-800 text-lg font-bold mb-2">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-[60%] px-3 py-2 border text-black text-sm rounded-md focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Category</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="mystery">Mystery</option>
              </select>
            </div>

            <Button type='submit' onClick={handleSubmit} outline gradientDuoTone='purpleToPink'>
              Apply Filters
            </Button>
            {errorMessage &&
              <Alert color='failure'>
                {errorMessage}

              </Alert>}
          </div>
        </form>

      </div>}
        
        <div className=' h-full    w-full'>
          <h1 className='text-2xl mx-[3%] md:mx-0 h-[8%] font-semibold sm:border-b-2 border-orange-500   mt-5 '>
            Books results:
          </h1>

          <div className='p-2 h-[89%]  flex flex-wrap gap-4 overflow-hidden overflow-y-scroll'>
            {loading &&
              <div className="text-center flex flex-col justify-center h-full  mx-auto">
                <Spinner size='xl' />
                <span className='pl-3'>Loading...</span>
              </div>
            }

            {!loading && books?.length === 0 && (
              <p className='text-xl text-gray-500'>No books found.</p>
            )}


            <div className="mt-[2%]   grid grid-cols-2 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-8    w-[100%] mx-auto">

              {books?.length > 0 && books?.map((card) => (
                <Card card={card} />
              ))}

            </div>

            {showMore && (
              <button
                onClick={handleShowMore}
                className='text-teal-500 text-sm hover:underline  w-full'
              >
                Show More
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}