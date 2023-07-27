import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { articleOffsetAtom } from '../../lib/jotai/article';

type Pagination = {
  list: number[];
};

function HomePagination({ list }: Pagination) {
  const [pageAtom, setPageNumber] = useAtom(articleOffsetAtom);

  const [isActive, setIsActive] = useState<number | null>(pageAtom);

  const handleClick = (page: number) => {
    setPageNumber(page);
    setIsActive(page);
  };

  return (
    <nav>
      <ul className="pagination">
        {list.map((page: number) => {
          return (
            <li
              key={page.toString()}
              className={`page-item ${isActive === page ? 'active' : ''}`}
            >
              <button
                onClick={() => handleClick(page)}
                type="button"
                className="page-link "
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default HomePagination;