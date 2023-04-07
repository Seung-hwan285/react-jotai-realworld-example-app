import LoginPage from "./pages/LoginPage.js";
import Header from "./layout/header.js";
import HomePage from "./pages/HomePage.js";
import {initRouter} from "./utils/routes.js";

function App({target}){

    const routes=()=>{
        // header 컴포넌트가 계속 실행이 되고 있는다.

        const {pathname} = window.location;
        console.log(pathname);

        if(pathname==='/'){
            HomePage(target);
        }
        else if(pathname ==='/login'){
            LoginPage(target);
        }
    }



    const render=()=>{
        Header(target);

        initRouter(()=>routes());
        routes();
    }


    render();
}


export default App;