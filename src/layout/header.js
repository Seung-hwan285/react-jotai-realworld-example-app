function Header(target){


    const nav = document.createElement('nav');

    const headerContainer =document.createElement('div');
    headerContainer.className='container';

    const logoElement = document.createElement('a');
    logoElement.innerText=`conduit`;
    logoElement.className='navbar-brand';
    nav.appendChild(logoElement);
    nav.appendChild(headerContainer);
    target.appendChild(nav);

    const render=()=>{
        headerContainer.innerHTML=`
           <ul>
            <li>Home</li>
            <li>Sing in</li>
            <li>Sing up</li>
           </ul>
        `

    }

    render();
}
export default  Header;