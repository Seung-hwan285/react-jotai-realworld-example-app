import {request} from "../../utils/request.js";
import {route} from "../../utils/routes.js";
import {setLocalStroage} from "../../utils/storage.js";
import {debounce} from "../../utils/debounce.js";

function LoginFormInput(LoginFormBox){


    const handleEmailChange=(e)=> {
        const value = e.target.value;
        console.log(value);
        const displayElement = document.querySelector('.input-value');
        displayElement.textContent = value;
    }

    const handleUserSubmit= ()=>{
        const form = document.querySelector('.form');

        form.addEventListener('submit',async(e)=>{
            e.preventDefault();
            const email = document.querySelector('.email').value;
            const password = document.querySelector('.password').value;

            const token = await request.userLogin(email,password);
            setLocalStroage('token',token);
            if(token){
                route("/");
            }
        })
    }

    const render=()=>{

        LoginFormBox.innerHTML=`
            <form class="form">
                <div class="sign-in-box">
                <input  class="email" type="text" placeholder="Email">
                    <div class="input-value"></div>
                <input class="password" type="text" placeholder="Password">      
                
                         
                </div>
                
                <button class="form-button" type="submit">Sign in</button>
            </form>
        `
            const input = document.querySelector('.email');
            input.addEventListener('input',debounce((e)=>{
                handleEmailChange(e);
            },1000));
            handleUserSubmit();
        }

        render();
}
export default LoginFormInput;