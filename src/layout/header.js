// TODO 헤더 라우터 처리
// [x] 홈 버튼 클릭시 홈으로 이동한다.
// [x] Sign in 버튼 클릭시 로그인 페이지로 이동한다.
// [] Sign up 버튼 클릭시 회원가입 페이지로 이동한다.
// [] 로고 버튼 클릭스 홈으로 이동한다.



import {route} from "../utils/routes.js";

function Header(target){
    const nav = document.createElement('nav');

    const headerContainer =document.createElement('div');
    headerContainer.className='container';

    const logoElement = document.createElement('a');
    logoElement.innerText=`conduit`;
    logoElement.className='navbar-brand';
    nav.appendChild(logoElement);
    nav.appendChild(headerContainer);
    target.appendChild(nav);

    const handleClick=()=>{
        const ul = document.querySelector('.container-ul');
        ul.addEventListener('click',(e)=>{
            const li = e.target;
            const link = li.dataset.link;


            route(link);
        })

    }

    const render=()=>{


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