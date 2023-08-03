import React from 'react';
import { useAtom } from 'jotai';
import { articleOffsetAtom } from '../../lib/jotai/article';
import { isArrayWithItems } from '../../lib/utils/type-guard/data';
import { Pagination } from '../../lib/utils/type/article';

function HomePagination({ list }: Pagination) {
  const [pageAtom, setPageNumber] = useAtom(articleOffsetAtom);

  const handleClick = (page: number) => {
    setPageNumber(page);
  };

  return (
    <nav>
      <ul className="pagination">
        {isArrayWithItems<Pagination>(list) &&
          list.map((page: number) => {
            return (
              <li
                key={page.toString()}
                className={`page-item ${pageAtom === page ? 'active' : ''}`}
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
