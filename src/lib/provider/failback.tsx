import React from 'react';

import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function RootBoundary() {
  const error = useRouteError();

  console.log(error);
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      // eslint-disable-next-line react/no-unescaped-entities
      return <div>404</div>;
    }

    if (error.status === 403) {
      return <h1>403</h1>;
    }

    if (error.status === 401) {
      // eslint-disable-next-line react/no-unescaped-entities
      return <div>401</div>;
    }

    if (error.status === 503) {
      return <div>503</div>;
    }

    if (error.status === 422) {
      return <div>422</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}
export default RootBoundary;
