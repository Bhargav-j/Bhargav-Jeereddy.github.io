var slider1 = document.getElementById("range1");
var slider2 = document.getElementById("range2");
var output1 = document.getElementsByClassName("value1")[0];
var output2 = document.getElementsByClassName("value1")[1];

output1.innerHTML = `${slider1.value}%`;
output2.innerHTML = `${slider2.value}%`;

slider1.oninput = function () {
  output1.innerHTML = `${this.value}%`;
};
slider2.oninput = function () {
  output2.innerHTML = `${this.value}%`;
};

function applyColor(event, slider) {
  var val = event.target.value;
  var color = `linear-gradient(90deg, rgb(83, 125, 207) ${val}%, rgb(218, 216, 216) ${val}%)`;
  slider.style.background = color;
}

slider1.addEventListener("mousemove", (event) => applyColor(event, slider1));
slider2.addEventListener("mousemove", (event) => applyColor(event, slider2));

var updateButton = document.getElementsByClassName("sm-button")[0];
var bellIcon = document.getElementsByClassName("top-icon")[0];
var crossIcon = document.getElementsByClassName("top-icon")[1];
var BaseIcons = document.getElementsByClassName("icons-2")[0];

crossIcon.style.display = "none"; //Initial

// Observing the update button onscreen
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      BaseIcons.style.display = 'flex';
      bellIcon.style.display = 'block';
      crossIcon.style.display = 'none';
    } else {
      BaseIcons.style.display = 'none';
      bellIcon.style.display = 'none';
      crossIcon.style.display = 'block';
    }
  });
});

// Start observing the element
observer.observe(updateButton);

//Chart
var aspectRatio;
var prevScreen = null;

function setChartAspectRatio() {
  if (window.innerWidth < 992) {
    aspectRatio = 1.5;
    if (!prevScreen || prevScreen === "large") {
      createChart();
      // console.log(aspectRatio);
      prevScreen = "small"
    }
  } else if (window.innerWidth > 992) {
    aspectRatio = 3.25;
    if (!prevScreen || prevScreen === "small") {
      createChart();
      // console.log(aspectRatio);
      prevScreen = "large"
    }
  }
}


// Call the function initially and on window resize
setChartAspectRatio();
// console.log(aspectRatio)
window.addEventListener("resize", setChartAspectRatio);

function createChart() {
  var canvas = document.getElementById("myChart");

  if (canvas) {
    canvas.parentNode.removeChild(canvas);
  }

  // new canvas element
  var newCanvas = document.createElement("canvas");
  newCanvas.id = "myChart";
  document.querySelector(".Chart").appendChild(newCanvas);
  var ctx = newCanvas.getContext("2d");

  // const ctx = document.getElementById("myChart").getContext("2d");

  const mydata = {
    labels: [20, "", 25, "", 30, "", 35, "", 40, "", 60, "", 65], //13
    datasets: [
      {
        label: "Employer:",
        data: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 85, 99], //13
        backgroundColor: ["rgb(64, 28, 130)"],
      },
      {
        label: "My First Dataset",
        data: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 85, 99], //13
        backgroundColor: ["rgb(90, 40, 182)"],
      },
      {
        label: "My First Dataset",
        data: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 85, 99], //13
        backgroundColor: ["rgb(146, 174, 231)"],
      },
    ],
  };

  const config = {
    type: "bar",
    data: mydata,
    options: {
      aspectRatio: aspectRatio,
      plugins: {
        legend: {
          display: false,
        },
      },
      barPercentage: 0.55,
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: "rgba(255, , 132, 0.2)",
            font: {
              weight: "bold",
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          ticks: {
            callback: function (value, index, values) {
              return "$" + value;
            },
            color: "rgba(255, , 132, 0.2)",
            font: {
              weight: "bold",
            },
          },
          grid: {
            borderDash: [2, 20],
          },
        },
      },
    },
  };

  new Chart(ctx, config);
}

createChart();
