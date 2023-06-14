let hours = document.getElementsByClassName('hours')[0];
let min = document.getElementsByClassName('min')[0];
let sec = document.getElementsByClassName('sec')[0];
let ampm = document.getElementsByClassName('ampm')[0];

function Display(){
let time = new Date();
let hr =time.getHours();
let mn = time.getMinutes();
let se = time.getSeconds();

let day = (hr >= 12) ? 'PM' : "AM";

if (hr > 12){
    hr = hr-12
}


    hours.innerText = hr;
    min.innerText = mn;
    sec.innerText = se;
    ampm.innerText = day;
    // console.log(hr, mn, se)
    setTimeout(Display, 1000);
}

Display();

// const hourEl = document.getElementsByClassName("hours");
// const minuteEl = document.getElementsByClassName("min");
// const secondEl = document.getElementsByClassName("sec");
// const ampmEl = document.getElementsByClassName("ampm");

// function updateClock() {
//   let h = new Date().getHours();
//   let m = new Date().getMinutes();
//   let s = new Date().getSeconds();
//   let ampm = "AM";

//   if (h > 12) {
//     h = h - 12;
//     ampm = "PM";
//   }

//   h = h < 10 ? "0" + h : h;
//   m = m < 10 ? "0" + m : m;
//   s = s < 10 ? "0" + s : s;

//   hourEl.innerText = h;
//   minuteEl.innerText = m;
//   secondEl.innerText = s;
//   ampmEl.innerText = ampm;
// //   console.log(h, m, s)
//   setTimeout(() => {
//     updateClock();
//   }, 1000);
// }

// updateClock();


