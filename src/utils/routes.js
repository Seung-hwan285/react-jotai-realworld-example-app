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

// 커스텀 이벤트를 사용해서 ROUTE_CHAGNE라는 이벤트를 만들고
// dispatchEvent로 해당 이벤트를 발생시켜준다.
// 그리고 detail로 값을 전달
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
