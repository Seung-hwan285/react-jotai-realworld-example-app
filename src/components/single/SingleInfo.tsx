import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import SingleBanner from './SingleBanner';
import SingleBody from './SingleBody';
import SingleComment from './SingleComment';
import useSingleInfo from './hook/useSingleInfo';

function SingleInfo() {
  const { single, handleSubmit } = useSingleInfo();

  return (
    <>
      {!!single.article ? (
        <div className="article-page">
          <SingleBanner article={single.article} />
          <div className="container page">
            <SingleBody article={single.article} />
            <hr />
            <SingleComment onSubmit={handleSubmit} />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
export default SingleInfo;
