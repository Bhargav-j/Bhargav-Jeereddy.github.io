const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

draggableElements.forEach((ele) => {
    ele.addEventListener("dragstart", dragStart);
    // ele.addEventListener("drag", drag);
    // ele.addEventListener("dragend", dragEnd);

});

droppableElements.forEach((ele) => {
    ele.addEventListener("dragenter", dragEnter);
    ele.addEventListener("dragover", dragOver);
    ele.addEventListener("dragleave", dragLeave);
    ele.addEventListener("drop", drop);
})

// Drag and Drop functions

function dragStart(event){
    // each drag event has dataTransfer property which holds events data and also have methods to manage data
    // we are using setData method of dataTransfer property
    // event.dataTransfer.setData("text", event.target.style.color);
    event.dataTransfer.setData("text", event.target.id);
}

// Remove the default behaviour of not allowing the drop and now allowed to drop in the droppable elemments
// function activates when the dragOver the element
function dragOver(event){
    event.preventDefault();
}

// Removes the default behaviour of pasting the link of the img or pasting text on the web page
// We can add custom properties through dataTransfer property through get method
// Activated when the element is droped on it
function drop(event){
    event.preventDefault();
    // because if wrongly droped in other boxes, dragLeave function won't get activated.
    event.target.classList.remove("droppable-hover");
    const draggableElementData = event.dataTransfer.getData("text");
    // event.target.style.backgroundColor = draggableElementData;
    const droppableElementData = event.target.getAttribute("data-draggable-id");
    if (draggableElementData === droppableElementData) {
        event.target.classList.add("dropped");
        const draggableElement = document.getElementById(draggableElementData);
        event.target.style.backgroundColor = draggableElement.style.color; //only works for inline styles, for more general styles use the line below
        // event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", false);
        event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
    }
}

// When the draggable element enters the droppable area, function gets activated
// No default action, we add our own event action
function dragEnter(event){
    if (!event.target.classList.contains("dropped")){
        event.target.classList.add("droppable-hover");
    }
}

// When the draggable element leavs the droppable area without dropping, function gets activated
// No default action, we add our own event action
function dragLeave(event){
    if (!event.target.classList.contains("dropped")){
        event.target.classList.remove("droppable-hover");
    }
}