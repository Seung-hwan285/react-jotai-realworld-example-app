import LoginPage from "./pages/LoginPage.js";
import Header from "./layout/header.js";
import HomePage from "./pages/HomePage.js";
import {initRouter} from "./utils/routes.js";

function App({target}){

    const routes=()=>{

        const {pathname} = window.location;

        if(pathname==='/'){

           new HomePage(target);
        }
        else if(pathname ==='/login'){
            new LoginPage(target);
        }
    }



    const render=()=>{
        Header(target);
        initRouter(() => routes());
        routes();
    }

    render();
}


export default App;