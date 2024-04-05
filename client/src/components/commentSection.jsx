import { Alert, Button, Modal, ModalHeader, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './comment.jsx';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CommentLiked from './commentLiked.jsx';
import img from "../Images/rate.png";
import { yellow } from '@mui/material/colors';
export default function CommentSection({ bookId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [showModal1,setShowModal1]=useState(false);
  const [rating, setRating] = useState(0);
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsL, setCommentsL] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          bookId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  const handleRatingClick = (index) => {

    setRating(index);
  };


  const handleSubmitRating =async() => {
   
    try {
      const res = await fetch(`/api/book/addRating/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' // Set content type to JSON
        },
        body: JSON.stringify({ rating: rating })
      });
  
      if (res.ok) {
        const data = await res.json();
       
      } else {
        // Handle error response
        console.error('Failed to submit rating:', res.status);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }

  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getBookComments/${bookId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [bookId]);

  useEffect(() => {
    const getComments1 = async () => {
      try {
        const res = await fetch(`/api/comment/getmostLikedComments/${bookId}`);
        if (res.ok) {
          const data = await res.json();
        
          setCommentsL(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments1();
  }, [bookId]);


  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleLike1 = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setCommentsL(
          commentsL.map((comment) =>
            comment._id === commentId
              ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="h-72">
        <div className="font-bold text-2xl p-[2%]  ">
          What People say !!
        </div>
        <div className=" w-[95%]  mx-auto h-[80%] md:h-[60%] flex justify-evenly">
          {!commentsL.length && <div className='font-bold text-xl text-[#656464]  w-[50%] mx-auto text-center my-auto'>It seems like this book is waiting for someone to share their insights and opinions</div>} 
          {commentsL.map((comment,id) => (
            <CommentLiked
              key={comment._id}
              comment={comment}
              onLike={handleLike1}
              id={id}
             
            />

          ))}




        </div>

      </div>

      <div className='max-w-2xl mx-auto  w-full p-3'>


        {currentUser ? (
          <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as:</p>
            <img
              className='h-5 w-5 object-cover rounded-full'
              src={currentUser.profilePicture}
              alt=''
            />
            <Link
              to={'/dashboard?tab=profile'}
              className='text-xs text-cyan-600 hover:underline'
            >
              @{currentUser.username}
            </Link>
            <Button onClick={()=>setShowModal1(true)} outline gradientDuoTone="pinkToOrange" className='mx-4'>
              Rate this Book
            </Button>
          </div>
        ) : (
          <div className='text-sm text-teal-500 my-5 flex gap-1'>
            You must be signed in to comment.
            <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
              Sign In
            </Link>
          </div>
        )}
        {currentUser && (
          <form
            onSubmit={handleSubmit}
            className='shadow-xl bg-[#fbf6fe]   rounded-md p-3'
          >
            <Textarea
              placeholder='Add a comment...'
              rows='3'
              maxLength='200'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className='flex justify-between items-center mt-5'>
              <p className='text-gray-500 text-xs'>
                {200 - comment.length} characters remaining
              </p>
              <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                Submit
              </Button>
            </div>
            {commentError && (
              <Alert color='failure' className='mt-5'>
                {commentError}
              </Alert>
            )}
          </form>
        )}
        {comments.length === 0 ? (
          <p className='text-sm my-5'>No comments yet!</p>
        ) : (
          <>
            <div className='text-sm my-5 flex items-center gap-1'>
              <p>Comments</p>
              <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                <p>{comments.length}</p>
              </div>
            </div>
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            ))}
          </>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              < ErrorOutlineIcon style={{ fontSize: "" }} className='h-20 w-20 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this comment?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button
                  color='failure'
                  onClick={() => {handleDelete(commentToDelete);setShowModal(false)}}
                >
                  Yes, I'm sure
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
          onClose={() => setShowModal1(false)}
          popup
          
          size='md'
        >
          
          <Modal.Header />
          
          <Modal.Body>
            <div className='text-center'>
            <img src={img} className=' rounded-3xl h-full w-full'/>
              {/* < ErrorOutlineIcon style={{ fontSize: "" }} className='h-20 w-20 text-gray-400 dark:text-gray-200 mb-4 mx-auto' /> */}
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                How would you rate this Book ?
              </h3>
              <div className="my-[4%] w-[80%] mx-auto  justify-center flex items-center space-x-3">
              {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-10 w-10 cursor-pointer ${index < rating ? 'text-yellow-300' : 'text-gray-300'
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleRatingClick(index + 1)} 
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-semibold text-cyan-800 bg-cyan-100 dark:bg-cyan-200 dark:text-cyan-800 rounded px-1">{`${rating}/5`}</span>
              </div>
              <div className='flex flex-col gap-4'>
                
                <Button
                 
                  onClick={() =>{handleSubmitRating();setShowModal1(false)}}
                >
                  Submit
                </Button>
                <Button color='gray' onClick={() => setShowModal1(false)}>
                  No, Thanks
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

