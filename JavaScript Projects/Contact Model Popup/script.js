const modal = document.getElementById("contact-modal");
const openModal = document.getElementById("modal-open");
const closemodal = document.querySelector(".close-model");

openModal.addEventListener("click", () => {
    modal.style.display = "block";
})

closemodal.addEventListener("click", () => {
    modal.style.display = "none";
})

window.addEventListener("click", (event) => {
    if (event.target == modal){
        modal.style.display = "none";
    }
})