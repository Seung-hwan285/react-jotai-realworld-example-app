function LoginInput(LoginFormBox){

    const render=()=>{
        LoginFormBox.innerHTML=`
            <form class="form">
                   <div class="sign-in-box">
                <input type="text" placeholder="Email">
                <input type="text" placeholder="Password">                       
                </div>
            </form>
        `
    }
    render();
}
export default LoginInput;