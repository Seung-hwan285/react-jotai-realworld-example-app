function LoginFormTitle(LoginWrapper){



    const render=()=>{
        LoginWrapper.innerHTML=`
            <div class="sign-in-title">
                    <h2>Sign in</h2>
                    <p>Need an account?</p>
            </div>
        `
    }
    render();
}
export default LoginFormTitle;