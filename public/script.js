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
      label: "Lam Ngo",
      value: 4,
    },
    {
      label: "Dung Nguyen",
      value: 5,
    },
    {
      label: "Yen Nguyen",
      value: 6,
    },
    {
      label: "Hiep Nguyen",
      value: 7,
    },
    {
      label: "Bryce Polletti",
      value: 8,
    },
    {
      label: "Raymundo Rangel",
      value: 9,
    },
    {
      label: "Lee Robirds",
      value: 10,
    },
    {
      label: "Jason Stegriy",
      value: 11,
    },
    {
      label: "Shannon Taylor",
      value: 12,
    },
    {
      label: "Matt McGregor",
      value: 13,
    },
    {
      label: "Brandon Howard",
      value: 14,
    },
    {
      label: "Duyen Pham",
      value: 15,
    },
    {
      label: "Devon Krohn",
      value: 16,
    },
    {
      label: "Randy Pugh",
      value: 17,
    },
    {
      label: "Shawn Smith",
      value: 18,
    },
    {
      label: "Arun Chand",
      value: 19,
    },
    {
      label: "Valerie Corona",
      value: 20,
    },
    {
      label: "Jose Romero",
      value: 21,
    },
    {
      label: "Mike McCloskey",
      value: 22,
    },
    {
      label: "Bob Konop",
      value: 23,
    },
  ],
  prizes: [
    {
      label: "Boombox",
      value: 1,
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
  console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
  if (oldpick.length == data.length) {
    console.log("done");
    container.on("click", null);
    return;
  }
  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;

  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? picked % data.length : picked;
  if (oldpick.indexOf(picked) !== -1) {
    d3.select(this).call(spin);
    return;
  } else {
    oldpick.push(picked);
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
      d3.select("#winner h3").text("Prize: " + data.prizes[0].label);
      oldrotation = rotation;

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

  const ps = 360 / testData.employees.length;
  rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;

  console.log(
    "something: ",
    Math.round(testData.employees.length - (rotation % 360) / ps)
  );
  console.log("rotation: ", rotation);

  picked = Math.round(testData.employees.length - (rotation % 360) / ps);
  console.log("PICKED 1", picked);
  picked =
    picked >= testData.employees.length
      ? picked % testData.employees.length
      : picked;

  if (oldPick.indexOf(picked) !== -1) {
    d3.select(this).call(testSpin);
    return;
  }

  rotation += 90 - Math.round(ps / 2);

  socket.emit("spin", {
    picked: picked,
    rotation: rotation,
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

      d3.select("#winner h1").text(
        "Winner: " + testData.employees[picked].label
      );
      d3.select("#winner h3").text("Prizel: " + testData.prizes[0].label);

      d3.select("#prev").append("div");

      socket.emit("rotate", {
        oldRotation: rotation,
      });
    });
}
