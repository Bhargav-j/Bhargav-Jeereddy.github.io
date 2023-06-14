const photosContainer = document.querySelector('.image-container');
const columns = document.querySelectorAll(".column");
// const loadimg = document.querySelector('.btn');


function loadPic(final){
    for (var i=1 ; i <= final ; i++){
        // const imgE1 = document.createElement('img');
        // imgE1.className = 'img'
        // imgE1.src = 'https://picsum.photos/300/400?random='+Math.floor(Math.random()* 2000);
        // imgE1.setAttribute()
        // photosContainer.appendChild(imgE1);

        columns.forEach(column => {
            imgStr = `<img src=https://picsum.photos/${Math.floor(Math.random()* 1000)}/400?random=${Math.floor(Math.random()* 2000)} style="width:100%">`;
            column.insertAdjacentHTML("beforeEnd",imgStr);
        })
    }
}
loadPic(5);

window.addEventListener("scroll", () => {
    // console.log(window.scrollY);
    
    // console.log(document.body.scrollHeight);
    // console.log(document.body.scrollHeight - document.documentElement.clientHeight);
    targetheight = (document.body.scrollHeight - document.documentElement.clientHeight)
    // console.log((targetheight/3) *2);
    if (window.scrollY >= (targetheight/3) *2){
        loadPic(3);
    }
});

// loadimg.addEventListener('click', () => {loadPic(10)});



