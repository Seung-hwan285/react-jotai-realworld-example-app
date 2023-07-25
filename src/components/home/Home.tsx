import React, { Suspense } from 'react';
import HomeBanner from './HomeBanner';
import LoadingSpinner from '../common/LoadingSpinner';
import HomeSidebar from './HomeSidebar';
import HomeFeed from './HomeFeed';

const HomeArticleBody = React.lazy(() => import('./HomeArticlePreview'));

function Home() {
  return (
    <div className="home-page">
      <HomeBanner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <HomeFeed />
            <Suspense fallback={<LoadingSpinner />}>
              <HomeArticleBody />
            </Suspense>
          </div>
          <HomeSidebar />
        </div>
      </div>
    </div>
  );
}
export default Home;
