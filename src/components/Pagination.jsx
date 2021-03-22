import React from 'react'
import '../css/pagination.css'

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="pagination__item">
                        <a
                            onClick={() => paginate(number)}
                            href="javascript:void(00)"
                            className="pagination__link"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
