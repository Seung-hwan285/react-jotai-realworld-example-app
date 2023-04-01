function LoginFormInput(LoginFormBox){

    const render=()=>{
        LoginFormBox.innerHTML=`
            <form class="form">
                   <div class="sign-in-box">
                <input type="text" placeholder="Email">
                <input type="text" placeholder="Password">                       
                </div>
                
                <button class="form-button" type="submit">Sign in</button>
            </form>
        `
    }
    render();
}
export default LoginFormInput;