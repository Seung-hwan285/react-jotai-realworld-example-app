function HomePage(target){

    console.log(target);
    const homeContainer=document.createElement('div');
    homeContainer.className='Banner__Container';

    const homeWrapper = document.createElement('div');
    homeWrapper.className='Banner__Wrapper';

    homeContainer.appendChild(homeWrapper);
    target.appendChild(homeContainer);

    const render=()=>{
        homeWrapper.innerHTML=`
     
            <h1 class="banner-title">conduit</h1>
            <p class="banner-content">A place to share your hnwledge.</p>
        `
    }

    render();
}
export default HomePage;