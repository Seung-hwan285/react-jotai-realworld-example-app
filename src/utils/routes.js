const ROUTES_CHANGE_EVENT = 'ROUTE_CHANGE';

export const initRouter = (onRouter)=>{
    window.addEventListener(ROUTES_CHANGE_EVENT,(e)=>{
       const {nextUrl} = e.detail;
       console.log(nextUrl);
    });
}

export const route = (nextUrl)=>{
    if(nextUrl){
        window.dispatchEvent(

            new CustomEvent(ROUTES_CHANGE_EVENT,{
                detail:{
                    nextUrl
                }
            })
        )
    }
}