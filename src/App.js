import LoginPage from "./pages/LoginPage.js";
import Header from "./layout/header.js";
import HomePage from "./pages/HomePage.js";

function App({target}){
    Header(target);

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
        routes();
    }

    render();

}
export default App;