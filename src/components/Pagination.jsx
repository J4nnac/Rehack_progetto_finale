/* eslint-disable react/prop-types */
export default function Pagination({ page, setPage }) {
    const goToPage = (newPage) => {
        if (newPage > 0) {
            setPage(newPage);
        }
    }
    return (
        <div aria-label="Page navigation example border-0">
            <ul className="pagination">
                <li className="page-item" onClick={() => goToPage(page - 1)}>
                    <a
                        disabled={page <= 1}
                        href="#"
                        className="sidebarTitle page-link bg-darkGrey border-0"
                        aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li className="page-item"><a className=" sidebarTitle page-link border-0 bg-darkGrey">{page}</a></li>
                <li className="page-item" onClick={() => goToPage(page + 1)}>
                    <a
                        href="#"
                        className="page-link sidebarTitle bg-darkGrey border-0"
                        aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}
