import styles from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${styles.pageItem} ${number === currentPage ? styles.active : ''
              }`}
          >
            <button
              onClick={() => onPageChange(number)}
              className={styles.pageLink}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

