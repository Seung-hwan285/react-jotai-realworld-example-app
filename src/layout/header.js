// TODO 헤더 라우터 처리
// [] 홈 버튼 클릭시 홈으로 이동한다.
// [] Sign in 버튼 클릭시 로그인 페이지로 이동한다.
// [] Sign up 버튼 클릭시 회원가입 페이지로 이동한다.
// [] 로고 버튼 클릭스 홈으로 이동한다.


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



    const render=()=>{
        headerContainer.innerHTML=`
           <ul class="container-ul">
            <li data-link="/">Home</li>
            <li data-link="login">Sing in</li>
            <li data-link="signup">Sing up</li>
           </ul>
        `
    }

    render();
}
export default  Header;