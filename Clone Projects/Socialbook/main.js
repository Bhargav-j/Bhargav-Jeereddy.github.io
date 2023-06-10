const settingsMenuE1 = document.querySelector('.settings-menu');
const darktoggleE1 = document.querySelector('#dark-btn');

const popWindow = document.querySelector('.settings-menu');


function settingsMenuToggle(){
    settingsMenuE1.classList.toggle('settings-menu-height')
}

let navclick = document.querySelector('.main-page');
let clicked = 'no'

navclick.addEventListener('click', () => {
    clearTimeout(timeout);
    clicked = 'yes'
    toggleMenu();
})

toggleMenu();

function toggleMenu(){
    settingsMenuE1.classList.toggle('settings-menu-height');
    if (clicked === 'no'){
        timeout = setTimeout(() => {
        toggleMenu() }, 3000);
    }
}



darktoggleE1.onclick = function(){
    darktoggleE1.classList.toggle('dark-btn-on');
    document.body.classList.toggle('dark-theme');

    if (localStorage.getItem("theme")  == "light"){
        localStorage.setItem("theme","dark");
    } else {
        localStorage.setItem("theme","light");
    }
}

if (localStorage.getItem("theme") == "light"){
    darktoggleE1.classList.remove('dark-btn-on');
    document.body.classList.remove('dark-theme');
} else if (localStorage.getItem("theme")  == "dark") {
    darktoggleE1.classList.add('dark-btn-on');
    document.body.classList.add('dark-theme');
} else {
    localStorage.setItem("theme", "light");
}
