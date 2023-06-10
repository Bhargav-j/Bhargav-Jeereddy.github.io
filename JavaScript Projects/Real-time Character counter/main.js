const text = document.querySelector('#text');
const total_char = document.querySelector('.char');
const rem_char = document.querySelector('.left')

text.addEventListener('keyup', () =>{
    let char = text.value.length;
    // console.log(char);
    total_char.textContent = char;
    rem_char.textContent = text.getAttribute('maxlength')-char;
})