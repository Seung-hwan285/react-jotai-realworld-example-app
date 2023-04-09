
import {route} from "../utils/routes.js";
import {getLocalStroage} from "../utils/storage.js";
import {fetchAuthUserInfo} from "../utils/helper/authHelper.js";

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

    // 이벤트 함수를 최상위 스코프로 이동시켜서 한번만 등록시켜서 중복 문제가 해결
    // 이전에는 이 코드가 handleClick 함수안에 있어서 계속 등록이 되었음.
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


    const render=async ()=>{
        const authToken = getLocalStroage('token');
        const user = await fetchAuthUserInfo(authToken);

        if(authToken){
            HeaderContainer.innerHTML=`
                <ul class="container-ul">
                    <li data-link="/">Home</li>
                    <li data-link="new-article">New Article</li>
                    <li data-link="setting">Settings</li>
                    <li data-link="profile">${user.username}</li>
                </ul>
            `
        }
        else{
            HeaderContainer.innerHTML=`
           <ul class="container-ul">
            <li data-link="/">Home</li>
            <li data-link="login">Sing in</li>
            <li data-link="register">Sing up</li>
           </ul>
        `
        }
        // 이 함수는 렌더에서 계속 호출하는데 이전에는 매번 render를 호출할때마다 handleClick 함수가 등록되었다.
        // 그래서 로고버튼을 클릭하면 계속 Header 컴포넌트가 렌더링되는게 아니라 생성이 되서 중첩현상이 일어남
        // 하지만 hadndleClick 함수를 최상위 스코프로 이동시켜서 한번만 등록되므로 중복 문제가 해결
        handleClick();
    }
    render();

    return{
        render,
    }
}


export default  Header;