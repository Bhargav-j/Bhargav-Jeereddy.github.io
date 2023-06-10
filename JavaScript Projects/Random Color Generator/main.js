tilesMain = document.querySelector('.tiles_main');

const arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];


for (var i, i =0 ; i < 20; i ++){
    const tile = document.createElement('div');
    tile.className = 'tiles';
    let r1 = Math.floor(Math.random()*16);
    let r2 = Math.floor(Math.random()*16);
    let r3 = Math.floor(Math.random()*16);
    let r4 = Math.floor(Math.random()*16);
    let r5 = Math.floor(Math.random()*16);
    let r6 = Math.floor(Math.random()*16);
    let color = `#${arr[r1]}${arr[r2]}${arr[r3]}${arr[r4]}${arr[r5]}${arr[r6]}`
    tile.textContent = color
    // tile.textContent = `#${r1}${r2}${r3}${r4}${r5}${r6}`
    tile.style.setProperty('--paint',color);
    tilesMain.appendChild(tile);
}



