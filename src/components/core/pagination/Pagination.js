import React, {useEffect, useState, Component} from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//css
import PaginationCSS from "./Pagination.module.css";
const Pagination = ({limit, total, sendPageNumber}) => {
    const [paginationArray, setPaginationArray] = useState([]);
    useEffect(() => {
        let tempArray = [];
        const currentPage = 1;
        const totalPages = total === 0? 0 : Math.round(total/limit);
        for (let i = 1; i <= totalPages; i++) {
            const paginationItems = {};
            paginationItems["pagenumber"] = i;
            paginationItems["active"] = currentPage === i? true : false;
            tempArray = [... tempArray, paginationItems];
        }

        setPaginationArray(tempArray);
    }, []);

    const selectPage = (pagenumber) => {
        const findActiveIndex = paginationArray.findIndex((page) => page.active === true);
        if(findActiveIndex >= 0) {
            paginationArray[findActiveIndex].active = false;
            paginationArray[pagenumber - 1].active = true;

            sendPageNumber(pagenumber);
            setPaginationArray([...paginationArray]);
        }
    }

    const next = () => {
        const currentPage = paginationArray.find((page)=> page.active === true);
        if(currentPage && (currentPage.pagenumber < paginationArray.length)) {
            const {pagenumber} = currentPage;
            paginationArray[pagenumber - 1].active = false;
            paginationArray[pagenumber].active = true;

            sendPageNumber(pagenumber + 1);
            setPaginationArray([...paginationArray]);
        }
    }

    const prev = () => {
        const currentPage = paginationArray.find((page)=> page.active === true);
        if(currentPage && (currentPage.pagenumber > 1)) {
            const {pagenumber} = currentPage;
            paginationArray[pagenumber - 1].active = false;
            paginationArray[pagenumber - 2].active = true;

            sendPageNumber(pagenumber - 1);
            setPaginationArray([...paginationArray]);
        }   
    }


    return (
        <>
            <div className={`${PaginationCSS.paginationWrapper}`}>
                {paginationArray.length > 1 && <div className={`${PaginationCSS.paginationNumber} ${PaginationCSS.prev}`} onClick={prev}>
                    <ArrowBackIosIcon/>
                    </div>}
                <div className={`${PaginationCSS.numberWrapper}`}>
                    {paginationArray.map((page) => {
                        const {pagenumber, active} = page;
                        return <div key={pagenumber} className={`${PaginationCSS.paginationNumber} ${(active? PaginationCSS.active : "" )}`} onClick={() => selectPage(pagenumber)}>
                            {pagenumber}
                            </div>
                    })}
                </div>
                {paginationArray.length > 1 && <div className={`${PaginationCSS.paginationNumber} ${PaginationCSS.next}`} onClick={next}><ArrowForwardIosIcon/></div>}

            </div>
        </>
    )
}

export default Pagination
