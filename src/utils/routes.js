const ROUTE_CHANGE_EVENT = 'ROUTE_CHANGE';

export const initRouter = (onRoute) => {
  window.addEventListener('popstate', onRoute);
  window.addEventListener(ROUTE_CHANGE_EVENT, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const route = (nextUrl) => {
  if (nextUrl) {
    window.dispatchEvent(
      new CustomEvent(ROUTE_CHANGE_EVENT, {
        detail: {
          nextUrl,
        },
      })
    );
  }
};
