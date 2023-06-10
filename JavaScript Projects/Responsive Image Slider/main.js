const imagesE1 = document.querySelector('.images');
const nextE1 = document.querySelector(".next");
const prevE1 = document.querySelector(".prev");
const imgination = document.querySelectorAll(".circle")

const positions = ['0', '1200', '2400', '3600', '4800'];

let curPos = 0;

let timeout;

nextE1.addEventListener('click', () => {
    curPos++;
    clearTimeout(timeout);
    imgmove();
})

prevE1.addEventListener('click', () => {
    curPos--;
    clearTimeout(timeout);
    imgmove();
})

imgmove();

function imgmove(){
    if (curPos >= positions.length){
        curPos = 0;
    } else if ( curPos < 0){
        curPos = positions.length-1;     
    }
    // console.log(curPos)
    imgination.forEach((ele) => ele.classList.remove("color"));
    imgination[curPos].classList.add("color");
    imagesE1.style.transform = 'translateX(-'+positions[curPos]+'px)';

    timeout = setTimeout(() => {
        curPos++;
        imgmove();
    }, 3000);
}


imgination.forEach((element,  index) => {
    element.addEventListener("click", () => {
        // console.log(index);
        changeimg(index);
    })
})

// for (var i = 0; i < imgination.length; i++){
//     const each_imgination = imgination[i];
//     console.log("number" + i);
//     each_imgination.addEventListener('click', createClickListener(i));
// }

// function createClickListener(index) {
//     return function() {
//       console.log('Clicked element index:', index);
//       changeimg(index);
//     };
//   }

function changeimg(number){
    curPos = number;
    // console.log(number);
    clearTimeout(timeout);
    imgmove();
}