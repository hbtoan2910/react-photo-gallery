import "./Pagination.css";

type Pagination = {
  noOfPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
const Pagination = ({ noOfPages, currentPage, onPageChange }: Pagination) => {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo; Prev
      </button>

      {[...Array(noOfPages)].map((_, i) => (
        <button
          key={i + 1}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

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
