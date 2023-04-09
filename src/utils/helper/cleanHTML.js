
export const cleanHTML={
    HomePage : ()=>{
        const LoginBox = document.querySelector('.Login__Container');
        const registerBox = document.querySelector('.Register__Container');
        if(registerBox){
            registerBox.innerHTML='';
            registerBox.remove();
        }

        if(LoginBox){
            LoginBox.innerHTML='';
            LoginBox.remove();
        }
    },
    LoginPage :()=>{
        const Banner = document.querySelector('.Banner__Container');
        const registerBox = document.querySelector('.Register__Container');
        if(Banner){
            Banner.innerHTML=''
            Banner.remove();
        }
        if(registerBox){
            registerBox.remove();
        }
    },
    RegisterPage: ()=>{
        const Banner = document.querySelector('.Banner__Container');
        const Login = document.querySelector('.Login__Container');

        if(Login){
            Login.innerHTML='';
            Login.remove();
        }
        if(Banner){
            Banner.innerHTML='';
            Banner.remove();
        }
    }

}