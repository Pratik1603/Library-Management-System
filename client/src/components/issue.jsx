import React from "react"
import { useState, useEffect } from "react"
import IssueCard from "./issueCard"
import { Button } from "flowbite-react/lib/cjs/components/Button/Button"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Spinner,Modal } from "flowbite-react";

import {
    issueFetchStart,
    issueFetchSuccess,
    issueFetchFailure,
    updateFailure,
    updateSuccess,
    updateStart,
} from "../redux/issue/issueSlice.jsx";
const Issues = () => {
    const [showModal,setShowModal]=useState();
    const [pending,setPending]=useState();
    const [approved,setApproved]=useState();
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { loading, issues, error: errorMessage } = useSelector((state) => state.issue);
    const [showMore, setShowMore] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                dispatch(issueFetchStart());
                let res;
                let apiUrl = '/api/issue/getissues';

                if (currentUser.isLibrarian) {
                    apiUrl += `?librarianId=${currentUser._id}&`;
                } else if (currentUser.isOwner) {
                    apiUrl += '?';
                } else {
                    apiUrl += `?patronId=${currentUser._id}&`;
                }

                if (filter === 'approved') {
                    
                    apiUrl += 'isApproved=true';
                }
                else if (filter === 'pending') {
                    apiUrl += 'isApproved=false';
                } else if (filter === 'closed') {
                    apiUrl += 'issueClosed=true';
                }
                else if (filter === 'reset') {
                    apiUrl += '';
                }

                res = await fetch(apiUrl);


                const data = await res.json();
                if (res.ok) {

                    dispatch(issueFetchSuccess(data.issues));
                    setApproved(data.approvedIssue,);
                    setPending(data.pendingIssue);
                    if (data.issues.length < 3) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                dispatch(issueFetchFailure(error.message));
                console.log(error.message);
            }
        };

        fetchIssues();

    }, [filter]);
    const handleShowMore = async () => {
        const startIndex = issues.length;
        try {
            dispatch(issueFetchStart());
                let res;
                let apiUrl = '/api/issue/getissues';

                if (currentUser.isLibrarian) {
                    apiUrl += `?librarianId=${currentUser._id}&`;
                } else if (currentUser.isOwner) {
                    apiUrl += '?';
                } else {
                    apiUrl += `?patronId=${currentUser._id}&`;
                }
                apiUrl+=`startIndex=${startIndex}`
                if (filter === 'approved') {
                    console.log("k");
                    apiUrl += 'isApproved=true';
                }   
                else if (filter === 'pending') {
                    apiUrl += 'isApproved=false';
                } else if (filter === 'closed') {
                    apiUrl += 'issueClosed=true';
                }
                else if (filter === 'reset') {
                    apiUrl += '';
                }
                

            res = await fetch(apiUrl);
            
            const data = await res.json();
            const all=data;
            if (res.ok) {
                console.log(data);
                const updatedIssues = [...issues, ...data.issues];
                console.log(updatedIssues);
                dispatch(updateSuccess(updatedIssues));
                if (all.issues.length < 3) {
                   
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="h-full ">
            <div className="md:h-[25%] h-[15%] text-xl text-white flex font-semibold w-full p-[1%] justify-evenly">
    <div className="bg-gradient-to-br from-[#ec9d68] to-[#8c3910] shadow-xl text-center flex flex-col text-xl justify-center rounded-xl md:w-[20%]  w-[30%]">
        <span>Total Issues</span>
        {issues?.length}
    </div>
    <div className="bg-gradient-to-br from-[#60cc65] to-[#0e7416] shadow-xl text-center flex flex-col text-xl justify-center rounded-xl md:w-[20%] w-[30%]">
        <span>Approved Issues</span>
        {approved}
    </div>
    <div className="bg-gradient-to-br from-[#59b3c5] to-[#08657d] shadow-xl text-center flex flex-col text-xl justify-center rounded-xl md:w-[20%] w-[30%]">
        <span>Pending Issues</span>
        {pending}
    </div>
</div>
            <div className=" md:h-[75%] h-[85%] w-full py-[1%] px-[2%]  ">
                <div className=" flex justify-end ">

                    <Button size="sm" onClick={() => setIsOpen(!isOpen)} >
                        <FilterAltIcon />Filter
                    </Button>
                </div>
                {isOpen && (
                    <div className="z-20  opacity-90 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="filter-menu-button"
                            tabIndex="-1"
                        >
                            <button
                                onClick={() => { setFilter('approved'); setIsOpen(!isOpen) }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                Approved Issues
                            </button>
                            <button
                                onClick={() => { setFilter('pending'); setIsOpen(!isOpen) }}

                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                Pending Issues
                            </button>
                            <button
                                onClick={() => { setFilter('closed'); setIsOpen(!isOpen) }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                Closed Issues
                            </button>
                            <button
                                onClick={() => { setFilter('reset'); setIsOpen(!isOpen) }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                )}
                <div className="  h-[90%]  overflow-hidden w-full overflow-y-auto ">
                    {issues && issues?.map((issue) => (
                        <IssueCard issue={issue} />
                    ))}
                   {showMore && <div className="text-center w-full  ">

                        <button
                            onClick={handleShowMore}
                            className='w-full text-teal-500  self-center text-sm py-1'
                        >
                            Show more
                        </button>

                    </div>}
                </div>

                {/* <IssueCard/>     */}
            </div>
           

        </div>
    )
}
export default Issues;