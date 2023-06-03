
//////////////////  profile section content visible on click ////////////////////////
var tabLinks = document.getElementsByClassName('tab-links');

// if you use ClassName for extracting a group of elements, you cannot iterate directly on the group Element using for each
// you should again covert them to Nodelist aka Array using Array.from function
var tabLinks_array = Array.from(tabLinks);

var tabContents = document.querySelectorAll(".tab-contents");

function opentab(tabname){
    console.log(tabLinks);

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

////////////////////////  Make Link Item Active when Scrolling past Section /////////////////////////

const navLinksE1 = document.querySelectorAll(".nav-link");
const SegmentE1 = document.querySelectorAll(".segment");

let currentSection = 'header';

window.addEventListener("scroll", () => {
    SegmentE1.forEach( container => {
        if (window.scrollY >= container.offsetTop - container.clientHeight/3) {
            currentSection = container.id;
            // console.log(currentSection)
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
    if (foregroundColor == "#fff"){
        document.documentElement.style.setProperty('--bg', '#fff');
        document.documentElement.style.setProperty('--fc', '#080808');
        document.documentElement.style.setProperty('--about-font', '#161414');
        document.documentElement.style.setProperty('--services-bg', '#e3e2e2');
    } else {
        document.documentElement.style.setProperty('--bg', '#080808');
        document.documentElement.style.setProperty('--fc', '#fff');
        document.documentElement.style.setProperty('--about-font', '#ababab');
        document.documentElement.style.setProperty('--services-bg', '#262626');
    }
}


////////////////////  Show More button on porfolio //////////////////

const showMore = document.getElementById("showmore");
const workList = document.querySelectorAll(".work-list");

showMore.addEventListener('click', () => {
    workList[1].classList.toggle("hide");
    if (showMore.innerHTML === "See More"){
        showMore.innerHTML = "See Less";
    } else if (showMore.innerHTML === "See Less"){
        showMore.innerHTML = "See More";
    }
})
