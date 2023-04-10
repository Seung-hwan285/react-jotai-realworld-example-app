import {cleanHTML} from "../utils/helper/cleanHTML.js";

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



    const paintBanner=()=>{
        HomeWrapper.innerHTML=`
            <h1 class="banner-title">conduit</h1>
            <p class="banner-content">A place to share your hnwledge.</p>
        `
    }

    const render=()=>{
        cleanHTML.HomePage();
        paintBanner();
    }

    render();

}
export default HomePage;