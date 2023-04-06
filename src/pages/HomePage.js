import Header from "../layout/header.js";
import {route} from "../utils/routes.js";

function HomePage(target){

    console.log(target);
    const homeContainer=document.createElement('div');
    homeContainer.className='Banner__Container';

    const homeWrapper = document.createElement('div');
    homeWrapper.className='Banner__Wrapper';

    homeContainer.appendChild(homeWrapper);
    target.appendChild(homeContainer);

    const handleClick=()=>{
        const ul = document.querySelector('.container-ul');
        ul.addEventListener('click',(e)=>{
            const li = e.target;
            const link = li.dataset.link;
            console.log(link);

            route(link);
        })

    }

    const render=()=>{
        Header(target);


        homeWrapper.innerHTML=`
     
            <h1 class="banner-title">conduit</h1>
            <p class="banner-content">A place to share your hnwledge.</p>
        `

        handleClick();
    }

    render();
}
export default HomePage;