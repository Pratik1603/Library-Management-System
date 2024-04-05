import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Card=({card})=>{
    const navigate=useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const handleClick=()=>{
      if(currentUser){
        navigate(`/book/${card.slug}`) 
      }
      else{
        navigate('/login');
      }
    }
    return(
        <div className="bg-white  rounded-xl flex flex-col justify-evenly shadow-lg   w-[90%] h-56 ">
        <div className="h-[50%] w-[95%]  rounded-xl mx-auto">
          <img src={card.imageUrl} className="w-[100%] h-[100%] rounded-xl" alt={card.name} />
        </div>
        <div className=" h-[50%]  px-[2%]">
          <div className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{card.name}</div>
          <div className="text-xs tracking-tight text-gray-700 dark:text-gray-300">{card.author}</div>

          <div className="my-[4%] flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`h-4 w-4 cursor-pointer ${index < card.ratingOver ? 'text-yellow-300' : 'text-gray-300'
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"

                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="text-xs font-semibold text-cyan-800 bg-cyan-100 dark:bg-cyan-200 dark:text-cyan-800 rounded px-1">{`${card.ratingOver}/5`}</span>
          </div>

          <div className="px-[2%] flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900 dark:text-white">{card.price}/Wk</span>
            <a
              href="#"
              onClick={() => { handleClick()}}
              className="rounded-lg bg-cyan-700 px-1 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Open Book
            </a>
          </div>
        </div>
      </div>
    )
}

export default Card;