function HomePage(target){

    const homeContainer=document.createElement('div');
    homeContainer.className='Banner__Container';
    const container = document.querySelector('.Banner__Wrapper');

    if(container){
        return;
    }

    const homeWrapper = document.createElement('div');
    homeWrapper.className='Banner__Wrapper';

    homeContainer.appendChild(homeWrapper);
    target.appendChild(homeContainer);



    const render=()=>{
        const Login = document.querySelector('.Login__Container');


        if(Login){
            console.log(Login);
            Login.remove();
        }

        homeWrapper.innerHTML=`
            <h1 class="banner-title">conduit</h1>
            <p class="banner-content">A place to share your hnwledge.</p>
        `

    }

    render();

}
export default HomePage;