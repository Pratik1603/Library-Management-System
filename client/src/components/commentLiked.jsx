import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

export default function CommentLiked({ comment, onLike,id}) {
  const [user, setUser] = useState({});
  
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  
  return (
    <div className={`  md:flex bg-gradient-to-br my-auto  from-[#f7f7f8] to-[#f3eafb] text-[#484545] p-4 shadow-xl rounded-2xl w-[40%] h-[80%] md:h-full md:w-[30%] dark:border-gray-600 text-sm`}>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-8 h-8 md:w-14 md:h-14 rounded-full bg-gray-200'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1 h-[60%] md:h-[90%]   my-2 md:my-0 '>
        <div className='md:flex items-center justify-around mb-1'>
          <span className='font-bold mr-1 text-sm md:text-lg truncate'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <div className=' text-xs'>
            {moment(comment.createdAt).fromNow()}
          </div>
        </div>
       
            <p className=' px-[8%]  h-[60%] pb-2'>{comment.content}</p>
            <div className='flex items-center pt-1 md:pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`text-[#484545] hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              <p className='tex-white'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
              
            </div>
        
      </div>
    </div>
  );
}