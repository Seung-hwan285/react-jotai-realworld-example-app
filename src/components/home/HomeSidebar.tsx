import React from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { asyncTagsAtom } from '../../lib/jotai/async-atom';
import { articleFeedAtom } from '../../lib/jotai/article';

function HomeSidebar() {
  const [tags] = useAtom(asyncTagsAtom);
  const setTagAtom = useSetAtom(articleFeedAtom);

  const handleClick = (tag: string) => {
    setTagAtom({ feed: '', tag: tag });
  };

  return (
    <>
      <div className="col-md-3">
        <div className="sidebar">
          <p>Popular Tags</p>

          <div className="tag-list">
            {tags &&
              tags?.tags.map((tag: string) => {
                return (
                  <div key={tag}>
                    <span
                      onClick={() => handleClick(tag)}
                      className="tag-pill tag-default tag-items"
                    >
                      {tag}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeSidebar;
