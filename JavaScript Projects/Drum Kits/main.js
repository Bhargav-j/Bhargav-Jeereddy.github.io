const instruments = document.querySelector('#instruments');

const arr = ['crash', 'kick', 'snare', 'tom'];
// instruments.forEach(item => item.addEventListener('click', () => {
//     item.classList.toggle('active');
// }))

arr.forEach(item => {
    const btnE1 = document.createElement('button');
    btnE1.innerText = `'${item[0].toUpperCase()}'${item.slice(1)}`;
    btnE1.className = 'item';
    btnE1.style.backgroundImage = "url(images/"+item+".png)";
    instruments.appendChild(btnE1);
    const musicE1 = document.createElement('audio');
    musicE1.src = 'sounds/'+item+'.mp3';
    instruments.appendChild(musicE1);
    btnE1.addEventListener('click', (event) => {
        event.preventDefault();
        btnE1.style.transform = 'scale(.9)';
        btnE1.style.transition = "transform .5s";
        setTimeout( () => {btnE1.style.transform = 'scale(1)'}, 100);
        musicE1.play();
    });
    // important
    window.addEventListener('keydown', (event) => {
        if (event.key === (item.slice(0,1))){
            // console.log(item.slice(0,1));
            musicE1.play();
            btnE1.style.transform = 'scale(.9)';
            btnE1.style.transition = "transform .5s";
            setTimeout( () => {btnE1.style.transform = 'scale(1)'}, 100);
        }
    })
})