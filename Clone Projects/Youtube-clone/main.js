const menuIcon = document.querySelector('.menu-icon');
const sideBar = document.querySelector('.sidebar');
const Contianer = document.querySelector('.container');


menuIcon.onclick = function(){
    sideBar.classList.toggle("small-sidebar");
    Contianer.classList.toggle("large-container");
}