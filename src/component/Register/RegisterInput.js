function RegisterInput(RegisterFormBox){
    const render=()=>{
        RegisterFormBox.innerHTML=`
             <form class="form">
                <div class="register-box">
                    <input  class="username" type="text" placeholder="username">
                    <input  class="email" type="text" placeholder="Email">
                    <input class="password" type="text" placeholder="Password">      
                   
                </div>
                
                <button class="form-button" type="submit">Sign in</button>
            </form>
        `
    }
    render();
}
export default RegisterInput;