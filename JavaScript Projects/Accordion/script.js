const accordionHeaders = document.querySelectorAll(".accordion-item-header");
const accordionbodies = document.querySelectorAll(".accordion-item-body");

accordionHeaders.forEach(header => {
    header.addEventListener("click", displayBody);
});

function displayBody(event){
    hideBody(); // comment if you want to see multiple bodies on screen
    event.target.classList.add("active");
    event.target.nextElementSibling.style.maxHeight = event.target.nextElementSibling.scrollHeight+"px";
}

// TO display only single single body at a time

function hideBody(){
    accordionHeaders.forEach(header => {
        header.classList.remove("active");
    })

    accordionbodies.forEach(body => {
        body.style.maxHeight = "0px";
    })
}