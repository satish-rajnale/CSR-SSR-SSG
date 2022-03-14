import { useEffect, useState } from "react";
import paginationStyles from "../styles/pagination.module.css";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import Food from "../Components/Product";

export default function Pagination({
  data,
  searchValLength,
  handleFetchNext,
  openModal,
  filterByctg,
  pageLimit,
  dataLimit,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    /*@ts-ignore*/
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    let noOfPages = getPaginationGroup();
    if (currentPage == noOfPages[noOfPages.length - 1]) {
      handleFetchNext();
    }
  }, [currentPage]);
  return (
    <div>
      <section>
        {getPaginatedData().map((d, idx) => (
          <Food
            key={idx}
            item={d}
            withRemoveBtn={false}
            isSidebarList={false}
          />
        ))}
      </section>

      <div className={paginationStyles.pagination}>
        <span
          onClick={goToPreviousPage}
          className={`${paginationStyles.prev} ${
            currentPage === 1 ? paginationStyles.disabled : ""
          }`}
        >
          <BsFillArrowLeftSquareFill />
        </span>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`${paginationStyles.paginationItem} ${
              currentPage === item ? paginationStyles.active : ""
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <span
          test-id={"next"}
          onClick={goToNextPage}
          className={`${paginationStyles.next}  
          `}
        >
          <BsFillArrowRightSquareFill />
        </span>
      </div>
    </div>
  );
}
