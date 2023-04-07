
import {route} from "../utils/routes.js";
import {getLocalStroage} from "../utils/storage.js";

function Header(target){

    const $nav = document.querySelector('nav');

    const nav = document.createElement('nav');

    const headerContainer =document.createElement('div');
    headerContainer.className='container';

    const logoElement = document.createElement('a');
    logoElement.innerText=`conduit`;
    logoElement.className='navbar-brand';
    logoElement.setAttribute('data-link',"/");

    if(!$nav){
        nav.appendChild(logoElement);
        nav.appendChild(headerContainer);

        target.appendChild(nav);

    }

    const handleClick=()=>{
        const ul = document.querySelector('.container-ul');
        const navbarLogo = document.querySelector('.navbar-brand');

        navbarLogo.addEventListener('click',(e)=>{
            const link = e.target.dataset.link;
            route(link);
        })

        ul.addEventListener('click',(e)=>{
            const li = e.target;
            const link = li.dataset.link;
            route(link);
        });
    }

    // 메인페이지로 이동시 토큰값이 null이 나오고 있네?


    const render=()=>{

        const authData = getLocalStroage('token');
        console.log(authData);

        headerContainer.innerHTML=`
           <ul class="container-ul">
            <li data-link="/">Home</li>
            <li data-link="login">Sing in</li>
            <li data-link="register">Sing up</li>
           </ul>
        `
        handleClick();
    }

    render();
}


export default  Header;