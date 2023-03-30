function LoginPage(target){

    console.log(target);
    const LoginContainer = document.createElement('div');
    LoginContainer.className="Login__Container";

    const LoginWrapper = document.createElement('div');
    LoginWrapper.className="Login__Wrapper";

    const LoginFormBox = document.createElement('div');
    LoginFormBox.className="Login__Box";

    LoginContainer.appendChild(LoginWrapper);
    LoginContainer.appendChild(LoginFormBox);

    target.appendChild(LoginContainer);



    const paintLoginWrapper=()=>{
        LoginWrapper.innerHTML=`
            <div class="sign-in-title">
                    <h2>Sign in</h2>
                    <p>Need an account?</p>
            </div>
        `
    }

    const paintLoginFormBox=()=>{
        LoginFormBox.innerHTML=`
            <form class="form">
                   <div class="sign-in-box">
                <input type="text" placeholder="Email">
                <input type="text" placeholder="Password">                       
                </div>
            </form>
        `
    }


    const render=()=>{
        paintLoginWrapper();
        paintLoginFormBox();
    }

    render();

}
export default LoginPage;