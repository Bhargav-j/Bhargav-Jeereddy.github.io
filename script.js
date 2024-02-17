
//////////////////  profile section content visible on click ////////////////////////
var tabLinks = document.getElementsByClassName('tab-links');

// if you use ClassName for extracting a group of elements, you cannot iterate directly on the group Element using for each
// you should again covert them to Nodelist aka Array using Array.from function
var tabLinks_array = Array.from(tabLinks);

var tabContents = document.querySelectorAll(".tab-contents");

function opentab(tabname){
    // console.log(tabLinks);

    // Loop function on the tabLinks extracted using ClassName
    // for (ele of tabLinks){
    //     ele.classList.remove('active-link');
    // }

    tabLinks_array.forEach(classname => classname.classList.remove('active-link'));
    tabContents.forEach(classname => classname.classList.remove('active-tab'));

    event.currentTarget.classList.add('active-link');

    document.getElementById(tabname).classList.add('active-tab');

    // tabContents.forEach(idname => {
    //     if(idname.id === tabname) {
    //         idname.classList.add('active-tab')
    //     } 
    // })
}

/////////////// Sidebar toggle effect on small screens ///////////

const toggleMenu = document.getElementById("sidemenu");
const toggleButton = document.getElementById("sidemenu-toggle");

function openmenu(){
    if (toggleButton.classList.contains('fa-bars')){
        toggleMenu.style.right = "0";
        document.getElementById("sidemenu-toggle").classList.remove("fa-bars");
        document.getElementById("sidemenu-toggle").classList.add("fa-times");
    } else if (toggleButton.classList.contains('fa-times')) {
        toggleMenu.style.right = "-200px";
        document.getElementById("sidemenu-toggle").classList.remove("fa-times");
        document.getElementById("sidemenu-toggle").classList.add("fa-bars");
    }
}

function closemenu(){
    toggleMenu.style.right = "-200px";
}


/////////////////////////  sending data from bowser input form to the googlesheet /////////////////////////

// Adding current date to date input field which is invisible to the user
const datetimeInput = document.getElementById('datetime-input');
const currentDatetime = new Date().toString();

datetimeInput.value = currentDatetime;

// https://github.com/jamiewilson/form-to-google-sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbwp-lyOR9owdZcJbX54C7kVZyxxVQr-aiFLJKwJgjarrb2wq79VMb1nCImplXV3EXTM/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
msg.innerHTML = "Sending.. Message";
e.preventDefault()
fetch(scriptURL, { method: 'POST', body: new FormData(form)})
.then(response => {
    msg.innerHTML = "Message Sent successfully";
    setTimeout(function(){
        msg.innerHTML= ""
    }, 5000);
    form.reset()
})
.catch(error => console.error('Error!', error.message))
})

////////////////////////  Make Link Item Active when Scrolling pass Section /////////////////////////

const navLinksE1 = document.querySelectorAll(".nav-link");
const SegmentE1 = document.querySelectorAll(".segment");

let currentSection = 'header';

window.addEventListener("scroll", () => {
    SegmentE1.forEach( container => {
        if (window.scrollY >= container.offsetTop - container.clientHeight/3) {
            currentSection = container.id;
            // console.log(currentSection);
        }
    });

    navLinksE1.forEach(navlink => {
        if (navlink.href.includes(currentSection)){
            document.querySelector('.active-navbar').classList.remove("active-navbar");
            navlink.classList.add('active-navbar');
        }
    });

});

////////////////////////////  Dark more / light mode //////////////////

function changeTheme(){
    const rootStyles = getComputedStyle(document.documentElement);
    // const backgroundColor = rootStyles.getPropertyValue('--bg');
    const foregroundColor = rootStyles.getPropertyValue('--fc');
    // console.log(foregroundColor);
    // if white, change to black
    if (foregroundColor == "#fff"){
        document.documentElement.style.setProperty('--bg', '#fff');
        document.documentElement.style.setProperty('--fc', '#080808');
        document.documentElement.style.setProperty('--about-font', '#161414');
        document.documentElement.style.setProperty('--services-bg', '#e3e2e2');
        document.documentElement.style.setProperty('--projects-bg', '#ababab');
    } else {
        document.documentElement.style.setProperty('--bg', '#080808');
        document.documentElement.style.setProperty('--fc', '#fff');
        document.documentElement.style.setProperty('--about-font', '#ababab');
        document.documentElement.style.setProperty('--services-bg', '#262626');
        document.documentElement.style.setProperty('--projects-bg', '#fff');
    }
};


//////////////// Sroll Animation //////////////////

const aboutCol1 = document.querySelector(".about-col-1");
const aboutCol2 = document.querySelector(".about-col-2");
const Sevicesgrid = document.querySelectorAll(".services-container");
const projectContainer1 = document.querySelector(".project-container-1");
// const work = document.querySelectorAll(".work-group");
const projectContainer2 = document.querySelector(".project-container-2");
const projectContainer3 = document.querySelector(".project-container-3");
const contact = document.getElementById("contact");


scrollEffectArray = [aboutCol1, aboutCol2,...Sevicesgrid ,projectContainer1, projectContainer2, projectContainer3, contact];

window.addEventListener("scroll", () => {
    scrollEffectArray.forEach(ele => {
        const rectoffset = ele.getBoundingClientRect();
        if (rectoffset.top < window.innerHeight && rectoffset.bottom >= 0){
                ele.classList.add("appear");
                // console.log(ele.classList, "added APPEAR")
            } else {
                ele.classList.remove("appear");
            }
    });
});

///////////////////  Script for project containers ////////////////

const childElement = document.querySelectorAll(".scroll-indicator");

// Adding scroll effect to buttons based on choosen button

childElement.forEach(dirArrow => {
  dirArrow.addEventListener("click", (event) => {
        var direction;
        const parentElement = event.target.parentElement;
        const siblingElement = parentElement.querySelector('.work-group');
        const siblingVisibleWidth = siblingElement.clientWidth;
        const siblingScrollleft = siblingElement.scrollLeft;
        
        if (dirArrow.classList.contains("left")) {
        direction = "right";
        } else {
        direction = 'left';
        }

        // Scroll by the visible width in the specified direction
        siblingElement.scrollBy({
            left: direction === 'left' ? siblingVisibleWidth : -siblingVisibleWidth,
            behavior: "smooth",
        });

    // console.log(siblingScrollleft); 
    });
});

// Hiding the direction buttons if the scroll reaches end

const parentElement = document.querySelectorAll(".work-group");
const leftArrow = document.querySelectorAll(".scroll-indicator.left");
const rightArrow = document.querySelectorAll(".scroll-indicator.right");

parentElement.forEach((parent, index) => {
    parent.addEventListener("scroll", () => {
        const scrollLeft = parent.scrollLeft;
        const maxScrollLeft = parent.scrollWidth - parent.clientWidth;
        if (scrollLeft === 0) {
            leftArrow[index].style.opacity = "0";
            
        } else {
            leftArrow[index].style.opacity = "1";
        }

        if (scrollLeft >= maxScrollLeft-300) {
            rightArrow[index].style.opacity = "0";
        } else {
            rightArrow[index].style.opacity = "1";
        }
    });
});

// Changing the work-list display from flex to grid 
const showMore = document.querySelectorAll(".in-project-btn");
const workItems = document.querySelectorAll(".work-group");
showMore.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (btn.innerHTML === "See All"){
            btn.innerHTML = "See Less";
            workItems[index].classList.add("show-all");
            leftArrow[index].classList.add("show-all");
            rightArrow[index].classList.add("show-all");
        } else if (btn.innerHTML === "See Less"){
            workItems[index].classList.remove("show-all");
            leftArrow[index].classList.remove("show-all");
            rightArrow[index].classList.remove("show-all");
            btn.innerHTML = "See All";
        }
    });
});

