import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react/lib/cjs/components/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Tooltip } from "flowbite-react";
const IssueCard = ({issue}) => {
    const [showModal,setShowModal]=useState();
    const [issueData,setIssueData]=useState();
    const { currentUser } = useSelector((state) => state.user);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchDetails=async()=>{
            try{
                const res = await fetch(`/api/issue/getIssueBooksLib/${issue._id}`);
                const data = await res.json();
                if (res.ok) {

                    setIssueData(data.issue);
                  
                }
            }
            catch(e){
                console.log(e);
            }
        }
        fetchDetails();
        console.log(issueData);
    },[issue._id]);

    const ApproveIssue=async()=>{
        try{
            const res = await fetch(`/api/issue/approveIssue/${issue._id}/${currentUser._id}`, {
                method: 'PUT',
            });
            const data = await res.json();
            if (res.ok) {

                setIssueData({
                 
                              ...issueData,
                              isApproved: data.isApproved,
                              issueApprovedDate:data.issueApprovedDate,
                              bookReturnDateExpec:data.bookReturnDateExpec,
                            }
                            
                        )
                        toast("Issue Approved");    
              
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const ReturnBook=async()=>{
        try{
            const res = await fetch(`/api/issue/returnBook/${issue._id}/${currentUser._id}`, {
                method: 'PUT',
            });
            const data = await res.json();
            if (res.ok) {

                setIssueData({
                 
                              ...issueData,
                              isBookRetn: data.isBookRetn,
                              bookReturnedDate:data.bookReturnedDate,
                            }
                            
                        )
                        toast("Book returned");   
               
              
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const CloseIssue=async()=>{
        try{
            const res = await fetch(`/api/issue/closeIssue/${issue._id}/${currentUser._id}`, {
                method: 'PUT',
            });
            const data = await res.json();
            if (res.ok) {

                setIssueData({
                 
                              ...issueData,
                              issueClosed:data.issueClosed,
                            }
                            
                        )
               toast("Issue Closed")
              
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const deleteIssue=async()=>{
        try{
            const res = await fetch(`/api/issue/deleteIssue/${issue._id}/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {

                setIssueData()
               toast("Issue Deleted");
              
            }
        }
        catch(e){
            console.log(e);
        }
    }
    const deletebook=async()=>{
        try{
            const res = await fetch(`/api/user/deleteBook/${issueData?.patronId}/${issueData?.bookId}/${currentUser._id}`, {
                method: 'PUT',
            });
            const data = await res.json();
            if (res.ok) {
                toast("Book Deleted");      
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const addBook=async()=>{
        try{
            const res = await fetch(`/api/user/addBook/${issueData?.patronId}/${issueData?.bookId}/${currentUser._id}`,{
                method: 'PUT',
            });
            const data = await res.json();
            if (res.ok) {
                              
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    const addPatron=async()=>{
        try{
            const res = await fetch(`/api/user/addPatron/${currentUser._id}/${issueData?.patronId}`, {
                method: 'PUT',
            });
            const data = await res.json();
            if (res.ok) {
                              
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        issueData && (<div className=" bg-[#f9f5f9] p-[1%]  shadow-2xl my-[3%]  rounded-xl w-[90%] mx-auto md:h-44 h-48 flex justify-evenly">
            <div className="md:w-[20%] w-[30%] h-[95%] border-2 rounded-xl my-[0.5%]  ">
                <img src={issueData?.books[0]?.imageUrl} className="rounded-xl w-full h-full"/>
            </div>
            <div className="w-[75%] h-[95%] flex flex-col justify-evenly rounded-xl relative ">
                <div className="w-fit px-1 md:w-[13%] my-[1%] text-white bg-[#fa963e]  h-5 text-xs text-center py-1 flex flex-col justify-center ">
                    {issueData?.books[0]?.category}
                </div>
                <div className="absolute right-0 top-0">
                    <Button color="failure" size="xs" onClick={()=>setShowModal(true)}>
                        < DeleteIcon style={{height:"18px",width:"18px"}}/>
                    </Button>
                </div>
                <div className="w-full flex gap-2 text-xl font-semibold">
                    <div className='text-xs text-cyan-600 hover:underline'>
                        #{issue._id.substring(issue._id.length - 3)}
                    </div>
                    {issueData?.books[0]?.name}
                    <OpenInNewIcon onClick={()=>navigate(`/book/${issueData?.books[0]?.slug}`)} style={{fontSize:"15px"}} className="text-cyan-600 cursor-pointer"/>
                   
                </div>
                <div className="w-full flex">
                    <div className="md:w-[35%] w-[40%]">
                        <div className="w-full text-gray-500 text-xs">
                            {!issueData?.isApproved && <span className="text-red-500">Pending</span>}
                            {issueData?.isApproved && !issueData?.isBookRetn && <span className="text-green-500">Approved</span>}
                            {issueData?.isBookRetn && !issueData?.issueClosed && <span className="text-gray-500">Returned</span>}
                            {issueData?.issueClosed && <span className="text-black">Closed</span>}
                        </div>
                        <div className="flex w-[98%]    justify-between">
                            <div className=' items-center gap-1 my-1 text-gray-500 font-semibold md:text-sm text-xs'>
                                <p >Issuer </p>
                                <div className="flex  my-1 items-center">
                                    <Tooltip content={`@ ${issueData?.patron[0]?.username}`}><img
                                        className='h-5 w-5 object-cover rounded-full'
                                          src={issueData?.patron[0]?.profilePicture}
                                        alt=''
                                    /></Tooltip>
                                    
                                    <Link
                                        //   to={'/dashboard?tab=profile'}
                                        className='text-xs text-cyan-600 hover:underline md:block hidden'
                                    >
                                        {/* @{currentUser.username} */} @ {issueData?.patron[0]?.username}
                                    </Link>
                                </div>


                            </div>

                            <div className=' items-center  my-1 font-semibold text-gray-500 md:text-sm text-xs'>
                                <p >Librarian </p>
                                <div className="flex my-1 gap-1  items-center">
                                    <Tooltip content={`@ ${issueData?.librarian[0].usernam}`}>
                                    <img
                                        className='h-5 w-5 object-cover rounded-full'
                                          src={issueData?.librarian[0]?.profilePicture}
                                        alt=''
                                    />
                                    </Tooltip>
                                    
                                    <Link
                                        //   to={'/dashboard?tab=profile'}
                                        className='text-xs text-cyan-600 hover:underline md:block hidden'
                                    >
                                        {/* @{currentUser.username} */} @ {issueData?.librarian[0].username}
                                    </Link>
                                </div>


                            </div>

                        </div>
                    </div>
                    <div className="md:w-[70%] w-[60%] mx-auto flex flex-col  gap-2">
                        <div className="w-full font-semibold  flex justify-evenly">
                            <div className="text-gray-800  md:text-sm text-xs">
                                <div className="text-orange-700 md:inline">Issue period</div> : {issue.issuePeriod} Wks
                            </div>
                            {issueData?.issueApprovedDate && <div className="text-gray-800  md:text-sm text-xs">
                            <div className="text-orange-700 md:inline">Approved Date </div>: {issueData?.issueApprovedDate} 
                            </div>}
                            

                        </div>
                        <div className="w-full flex  font-semibold justify-evenly">
                            <div className="text-gray-800   md:text-sm text-xs">
                            {issueData?.bookReturnDateExpec && <div><span className="text-orange-700">Exp. Retn</span> : {issueData?.bookReturnDateExpec}</div>}
                            </div>
                            {issueData?.issueApprovedDate && <div className="text-gray-800  md:text-sm text-xs">
                            {issueData?.bookReturnedDate && <div><span className="text-orange-700">Retn Date</span>: {issueData?.bookReturnedDate}</div>}
                            </div>}
                            

                        </div>
                      

                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="font-bold text-xl">
                        $ {issue.amountPaid}
                    </div>
                    {!issueData.isApproved && (currentUser.isLibrarian || currentUser.isOwner) && !issueData.isApproved && 
                    
                    <div className=" md:w-[20%] h-8 font-bold text-lg my-2">
                    <Button size="xs" className="w-full h-[90%]" outline gradientDuoTone="greenToBlue"
                    onClick={() => {ApproveIssue();addBook();addPatron();}}
                    >
                       Approve
                    </Button>
                </div>}
                {!issueData.issueClosed && (currentUser.isLibrarian || currentUser.isOwner) && issueData.isApproved &&
                    
                    <div className="md:w-[20%] h-8 font-bold my-2 text-lg">
                    <Button size="xs" className="w-full h-[90%]" outline gradientDuoTone="pinkToOrange"
                    onClick={() => CloseIssue()}
                    >
                       Close Issue
                    </Button>
                </div>}
                    {issueData.isApproved &&  !issueData.isBookRetn && !currentUser.isLibrarian && !currentUser.isOwner &&
                    <div className="  md:w-[20%] my-2 h-8 font-bold text-lg">
                    <Button size="xs" className="w-full h-[90%]" outline gradientDuoTone="purpleToPink"
                    onClick={() => {ReturnBook();deletebook()}}
                    >
                       Return Book
                    </Button>
                </div>}
                  
                    
                </div>

            </div>
            <Modal
          show={showModal}
          onClose={() => {setShowModal(false);}}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              < ErrorOutlineIcon style={{ fontSize: "80px" }} className='h-20 w-20 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this Issue?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button
                  color='failure'
                  onClick={() => {deleteIssue();setShowModal(false)}}
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
        <ToastContainer />

        </div>)
    )

}
export default IssueCard;