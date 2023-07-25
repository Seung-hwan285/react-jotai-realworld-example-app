import React from 'react';
import { useAtom } from 'jotai';
import { asyncTagsAtom } from '../../lib/jotai/async-atom';
import { articleFeedAtom } from '../../lib/jotai/article';

function HomeSidebar() {
  const [tags] = useAtom(asyncTagsAtom);
  const [, setTagAtom] = useAtom(articleFeedAtom);

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
              tags?.tags.map((tag: string, idx: number) => {
                return (
                  <>
                    <span
                      onClick={() => handleClick(tag)}
                      key={idx}
                      className="tag-pill tag-default"
                    >
                      {tag}
                    </span>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeSidebar;
