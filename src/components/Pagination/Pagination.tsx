import { useEffect, useState } from "react";
import "./Pagination.css";

type Pagination = {
  noOfPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ noOfPages, currentPage, onPageChange }: Pagination) => {
  const [showAllPages, setShowAllPages] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 430);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 430);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = []; //add page 1

    if (!isMobile || showAllPages) {
      return Array.from({ length: noOfPages }, (_, i) => i + 1);
    }
    // Always show first 3 pages
    for (let i = 1; i <= Math.min(3, noOfPages); i++) {
      pages.push(i);
    }

    if (noOfPages > 4) {
      // Show ellipsis if there are pages between first 3 and last
      if (noOfPages > 4) {
        pages.push("...");
      }
      // Always show last page
      pages.push(noOfPages);
    } else {
      // Show remaining pages if total pages <= 4
      for (let i = 4; i <= noOfPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo; Prev
      </button>

      {/* {[...Array(noOfPages)].map((_, i) => (
        <button
          key={i + 1}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))} */}

      {getVisiblePages().map((page, _) =>
        page === "..." ? (
          <button
            key={page}
            className={currentPage === Number(page) ? "active" : ""}
            onClick={() => setShowAllPages(true)}
          >
            ...
          </button>
        ) : (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => {
              onPageChange(Number(page));
              setShowAllPages(false);
            }}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === noOfPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
