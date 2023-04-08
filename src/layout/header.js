
import {route} from "../utils/routes.js";
import {getLocalStroage} from "../utils/storage.js";

function Header(target){
    const nav = document.createElement('nav');
    const HeaderContainer =document.createElement('div');
    HeaderContainer.className='container';

    const LogoElement = document.createElement('a');
    LogoElement.innerText=`conduit`;
    LogoElement.className='navbar-brand';
    LogoElement.setAttribute('data-link',"/");

    nav.appendChild(LogoElement);
    nav.appendChild(HeaderContainer);
    target.appendChild(nav);

    const handleLinkClick=(e)=>{
        const link = e.target.dataset.link;
        route(link);
    }

    const handleClick=()=>{
        const ul = document.querySelector('.container-ul');
        const navbarLogo = document.querySelector('.navbar-brand');
        navbarLogo.addEventListener('click',handleLinkClick);
        ul.addEventListener('click',handleLinkClick);
    }

    const render=()=>{
        const authData = getLocalStroage('token');

        console.log(authData);
        HeaderContainer.innerHTML=`
           <ul class="container-ul">
            <li data-link="/">Home</li>
            <li data-link="login">Sing in</li>
            <li data-link="register">Sing up</li>
           </ul>
        `
        handleClick();
    }
    render();

    return{
        render,
    }
}


export default  Header;