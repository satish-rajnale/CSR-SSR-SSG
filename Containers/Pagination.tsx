import { useEffect, useState } from "react";
import Resaurant from "../Components/Resaurant";
import styles from "../styles/Home.module.css";
import paginationStyles from "../styles/pagination.module.css";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";

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
    if (!(currentPage >= 34)) {
      setCurrentPage((page) => page + 1);
    }
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
    if (
      currentPage == noOfPages[noOfPages.length - 1] &&
      !(currentPage >= 34) &&
      searchValLength == 0 &&
      filterByctg == ""
    ) {
      handleFetchNext();
    }
  }, [currentPage]);
  return (
    <div>
      <section>
        {getPaginatedData().map((d, idx) => (
          <Resaurant key={idx} item={d} openModal={openModal} />
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
          className={`${paginationStyles.next}  ${
            currentPage >= 34 ? paginationStyles.disabled : ""
          } ${
            filterByctg != "" || searchValLength > 3
              ? currentPage == pageLimit
                ? paginationStyles.disabled
                : ""
              : ""
          }
          `}
        >
          <BsFillArrowRightSquareFill />
        </span>
      </div>
    </div>
  );
}
