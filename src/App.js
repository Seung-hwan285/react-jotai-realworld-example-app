import LoginPage from "./pages/LoginPage.js";
import Header from "./layout/header.js";
import HomePage from "./pages/HomePage.js";
import {initRouter} from "./utils/routes.js";

function App({target}){

    const routes=()=>{

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
        initRouter(()=>routes());
        routes();
    }

    render();

}
export default App;