import LoginFormInput from "../component/Login/LoginInput.js";
import LoginFormTitle from "../component/Login/LoginFormTitle.js";

// TODO 로그인 성공시 토큰 반환하고 메인페이지로 이동
// [x] 사용자는 로그인을 한다.
// [x] 로그인 성공시 200을 보내고 메인 페이지로 이동한다.
// [] 로그인 성공시 헤더를 변경한다.

function LoginPage(target){

    const LoginContainer = document.createElement('div');
    LoginContainer.className="Login__Container";


    const container = document.querySelector('.Login__Container');
    if(container){
        return;
    }

    const LoginWrapper = document.createElement('div');
    LoginWrapper.className="Login__Wrapper";

    const LoginFormBox = document.createElement('div');
    LoginFormBox.className="Login__Box";

    LoginContainer.appendChild(LoginWrapper);
    LoginContainer.appendChild(LoginFormBox);

    target.appendChild(LoginContainer);


    const render=()=>{
        const Banner = document.querySelector('.Banner__Container');

        if(Banner){
            Banner.innerHTML=''
            Banner.remove();
        }

        LoginFormTitle(LoginWrapper);
        LoginFormInput(LoginFormBox);
    }


    render();

}
export default LoginPage;