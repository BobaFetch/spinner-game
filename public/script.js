// testing socket
const socket = io();
const messageBox = document.getElementById("messagebox");

const padding = {
  top: 20,
  right: 40,
  bottom: 0,
  left: 0,
};

const w = 900 - padding.left - padding.right;
const h = 900 - padding.top - padding.bottom;
let r = Math.min(w, h) / 2;
let rotation = 0;
let oldRotation = 0;
let picked = 100000;
let oldPick = [];
let color = d3.scale.category20();
let prizeIndex = 0;

const testData = {
  employees: [
    {
      label: "Chris Brown",
      value: 1,
    },
    {
      label: "Gorm Brunso",
      value: 2,
    },
    {
      label: "Tien Dinh",
      value: 3,
    },
    {
      label: "Dung Nguyen",
      value: 4,
    },
    {
      label: "Bryce Polletti",
      value: 6,
    },
    {
      label: "Raymundo Rangel",
      value: 7,
    },
    {
      label: "Shannon Taylor",
      value: 9,
    },
    {
      label: "Matt McGregor",
      value: 10,
    },
    {
      label: "Brandon Howard",
      value: 11,
    },
    {
      label: "Duyen Pham",
      value: 12,
    },
    {
      label: "Randy Pugh",
      value: 14,
    },
    {
      label: "Shawn Smith",
      value: 15,
    },
    {
      label: "Arun Chand",
      value: 16,
    },
    {
      label: "Mike McCloskey",
      value: 18,
    },
    {
      label: "Bob Konop",
      value: 19,
    },
    {
      label: "Joe Stout",
      value: 21,
    },
    {
      label: "Tiffany Schafer",
      value: 22,
    },
    {
      label: "Paula Hutchinson",
      value: 23,
    },
    {
      label: "Dan Hiner",
      value: 24,
    },
    {
      label: "Dana Thornton",
      value: 26,
    },
    {
      label: "John Sepulveda",
      value: 27,
    },
    {
      label: "William Woodward",
      value: 28,
    },
    {
      label: "Donald Smith",
      value: 30,
    },
    {
      label: "Shane Wemhoff",
      value: 36,
    },
    {
      label: "Phillip Greene",
      value: 31,
    },
    {
      label: "Greg Martinez",
      value: 32,
    },
    {
      label: "Tamara Dawson",
      value: 33,
    },
    {
      label: "Joshua Dawson",
      value: 34,
    },
    {
      label: "Jason Meske",
      value: 35,
    },
    {
      label: "David Mazza",
      value: 36,
    },
    {
      label: "Rob Gregg",
      value: 37,
    },
    {
      label: "Sean Phillips",
      value: 38,
    },
    {
      label: "Constance Pauly",
      value: 39,
    },
  ],
  prizes: [
    {
      label: "Seahawks Blanket",
      value: 1,
    },
    {
      label: "Zero Gravity Chair",
      value: 2,
    },
    {
      label: "Keyboard Mouse Set",
      value: 3,
    },
    {
      label: "Vacation Day(8 hrs)",
      value: 4,
    },
    {
      label: "Soap/Lotion Set",
      value: 5,
    },
    {
      label: "Camp Chair Cooler Combo",
      value: 6,
    },
    {
      label: "Weber Smokey Joe Grill",
      value: 7,
    },
  ],
};

//
// do not modify
//

var svg = d3
  .select("#chart")
  .append("svg")
  .data([testData.employees])
  .attr("width", w + padding.left + padding.right)
  .attr("height", h + padding.top + padding.bottom);
var container = svg
  .append("g")
  .attr("class", "chartholder")
  .attr(
    "transform",
    "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
  );
var vis = container.append("g");

var pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis
  .selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "slice");

arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color(i);
  })
  .attr("d", function (d) {
    return arc(d);
  });
// add the text
arcs
  .append("text")
  .attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
      "rotate(" +
      ((d.angle * 180) / Math.PI - 90) +
      ")translate(" +
      (d.outerRadius - 10) +
      ")"
    );
  })
  .attr("text-anchor", "end")
  .text(function (d, i) {
    return testData.employees[i].label;
  });

//
// end do not modify
//

container.on("click", testSpin);
function spin(d) {
  container.on("click", null);
  //all slices have been seen, all done
  console.log("OldPick: " + oldPick.length, "Data length: " + data.length);
  if (oldPick.length == data.length) {
    console.log("done");
    container.on("click", null);
    return;
  }
  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;

  picked = 23;
  // picked = picked >= data.length ? picked % data.length : picked;
  if (oldpick.indexOf(picked) !== -1) {
    d3.select(this).call(spin);
    return;
  } else {
    oldpick.push(picked);
    prizeIndex++;
  }
  rotation += 90 - Math.round(ps / 2);
  vis
    .transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      //mark question as seen
      d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr(
        "fill",
        "#111"
      );
      //populate question
      d3.select("#winner h1").text("Winner: " + data.employees[picked].label);
      d3.select("#winner h3").text("Prize: " + data.prizes[prizeIndex].label);
      oldrotation = rotation;
      // prizeIndex++;

      /* Get the result value from object "data" */
      console.log(data[picked].value);

      /* Comment the below line for restrict spin to sngle time */
      container.on("click", spin);
    });
}
//make arrow
svg
  .append("g")
  .attr(
    "transform",
    "translate(" +
      (w + padding.left + padding.right) +
      "," +
      (h / 2 + padding.top) +
      ")"
  )
  .append("path")
  .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
  .style({ fill: "black" });
//draw spin circle
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 60)
  .style({ fill: "white", cursor: "pointer" });
//spin text
container
  .append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .text("SPIN")
  .style({ "font-weight": "bold", "font-size": "30px" });

function rotTween(to) {
  var i = d3.interpolate(oldRotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}

function getRandomNumbers() {
  var array = new Uint16Array(1000);
  var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
  if (
    window.hasOwnProperty("crypto") &&
    typeof window.crypto.getRandomValues === "function"
  ) {
    window.crypto.getRandomValues(array);
    console.log("works");
  } else {
    //no support for crypto, get crappy random numbers
    for (var i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }
  return array;
}

socket.on("spin", (data) => {
  console.log("data", data);
  picked = data.picked;
  rotation = data.rotation;
  oldPick = data.oldPick;
  prizeIndex = data.prizeIndex;

  spinWheel();
  container.on("click", testSpin);
});

function testSpin() {
  container.on("click", null);
  console.log(oldPick);

  // if all choices have been exhausted
  if (oldPick.length == testData.employees.length) {
    container.on("click", null);
    d3.select("#winner h1").text("No Prizes Left");
    return;
  }

  const ps = 360 / 23; // testData.employees.length;
  rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;

  console.log(
    "something: ",
    Math.round(testData.employees.length - (rotation % 360) / ps)
  );
  console.log("rotation: ", rotation);

  picked = Math.round(testData.employees.length - (rotation % 360) / ps);
  picked = 23;
  // picked >= testData.employees.length
  //   ? picked % testData.employees.length
  //   : picked;

  if (oldPick.indexOf(picked) !== -1) {
    d3.select(this).call(testSpin);
    return;
  }

  rotation += 90 - Math.round(ps / 2);
  prizeIndex++;

  socket.emit("spin", {
    picked: picked,
    rotation: rotation,
    prizeIndex: prizeIndex,
  });

  // socket.on("spin", (data) => {
  //   console.log(data);
  //   picked = data.picked;
  //   rotation = data.rotation;
  //   oldPick = data.oldPick;

  //   spinWheel();
  //   container.on("click", testSpin);
  // });
}

function init() {
  socket.on("init", (params) => {
    oldPick = params.oldPick;
    picked = params.picked;
    rotation = params.rotation;
    prizeIndex = params.prizeIndex;
  });
  console.log("initialized");
}

init();

function spinWheel() {
  vis
    .transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr(
        "fill",
        "#111"
      );

      d3.selectAll("svg").remove();
      d3.select("#chart").style({
        display: "flex",
        width: "100vw",
        height: "100vh",
      });
      d3.select("#chart").append("div").attr("class", "shane");

      d3.select(".shane").append("h1").text("Winner: Shane Wemhoff!");
      // d3.select(".shane").append("h2").text("Pig Socks");
      d3.select(".shane")
        .append("img")
        .attr("src", "/images/socks.jpg")
        .attr("class", "socks");

      // d3.select("#winner h1").text(
      //   "Winner: " + testData.employees[picked].label
      // );
      // d3.select("#winner h3").text(
      //   "Prize: " + testData.prizes[prizeIndex - 1].label + "!"
      // );

      // d3.select("#prev").append("div");

      socket.emit("rotate", {
        oldRotation: rotation,
        prizeIndex: prizeIndex,
      });
    });
}
