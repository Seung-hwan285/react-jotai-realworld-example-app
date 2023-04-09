function HomePage(target){

    const HomeContainer=document.createElement('div');
    HomeContainer.className='Banner__Container';
    const container = document.querySelector('.Banner__Wrapper');

    if(container){
        return;
    }

    const HomeWrapper = document.createElement('div');
    HomeWrapper.className='Banner__Wrapper';

    HomeContainer.appendChild(HomeWrapper);
    target.appendChild(HomeContainer);



    const render=()=>{
        const Login = document.querySelector('.Login__Container');
        const registerBox = document.querySelector('.Register__Container');


        if(registerBox){
            registerBox.innerHTML='';
            registerBox.remove();
        }

        if(Login){
            Login.innerHTML='';
            Login.remove();
        }

        HomeWrapper.innerHTML=`
            <h1 class="banner-title">conduit</h1>
            <p class="banner-content">A place to share your hnwledge.</p>
        `

    }

    render();

}
export default HomePage;