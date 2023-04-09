import RegisterInput from "../component/Register/RegisterInput.js";

function RegisterPage(target){

    const RegisterContainer = document.createElement('div');
    RegisterContainer.className='Register__Container';

    const container = document.querySelector('.Register__Container');

    if(container){
        return;
    }


    const RegisterWrapper = document.createElement('div');
    RegisterWrapper.className='Register__Wrapper';

    const RegisterFormBox = document.createElement('div');
    RegisterFormBox.className='Register__Box';

    RegisterContainer.appendChild(RegisterWrapper);
    RegisterContainer.appendChild(RegisterFormBox);

    target.appendChild(RegisterContainer);


    const render=()=>{

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
    render();
}
export default RegisterPage;