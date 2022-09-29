let plant1 = {
  name: "rose",
  water: 0,
  waterMax: 1,
  fertilizer: 0,
  fertilizerMax: 1,
  totalWater: 0,
  totalFertilizer: 0,
  stage: 1,
  stageName: "Seedling",
  stageFlower: [3, 2],
  stageBloom: [8, 5],
};

let plantReset = {
  name: "rose",
  water: 0,
  waterMax: 1,
  fertilizer: 0,
  fertilizerMax: 1,
  totalWater: 0,
  totalFertilizer: 0,
  stage: 1,
  stageName: "Seedling",
  stageFlower: [3, 2],
  stageBloom: [6, 4],
};

let resources = {
  water: 20,
  fertilizer: 10,
  diamond: 1000,
};

function waterPlant() {
  if (
    plant1.water < plant1.waterMax &&
    resources.water > 0 &&
    plant1.stage != 3
  ) {
    plant1.water += 1;
    plant1.totalWater += 1;
    resources.water -= 1;
    console.log(plant1);
    plantStageChanger();
  } else {
    console.log("Plant has fully watered");
  }
  refreshResources();
  refreshPlant1();
}

function buyWater() {
  if (resources.diamond >= 200) {
    resources.water += 20;
    resources.diamond -= 200;
    refreshResources();
  } else {
    console.log("Do not have enough diamonds");
  }
}

function fertilizePlant() {
  if (
    plant1.fertilizer < plant1.fertilizerMax &&
    resources.fertilizer > 0 &&
    plant1.stage != 3
  ) {
    plant1.fertilizer += 1;
    plant1.totalFertilizer += 1;
    resources.fertilizer -= 1;
    console.log(plant1);
    plantStageChanger();
    console.log("Succesfully Fertilized the plant");
  } else {
    console.log("Plant has fully fertilized");
  }
  refreshResources();
  refreshPlant1();
}

function buyFertilizer() {
  if (resources.diamond >= 200) {
    resources.fertilizer += 20;
    resources.diamond -= 200;
    refreshResources();
  } else {
    console.log("Do not have enough diamonds");
  }
}

// ===============================USER INTERFACE OR HTML ELEMENTS========================================
let waterValue = document.querySelector("#Water");
let fertilizerValue = document.querySelector("#Fertilizer");
let gemValue = document.querySelector("#Diamond");
let p1ws = document.querySelector("#water-status-1");
let p1fs = document.querySelector("#fertilizer-status-1");
let p1s = document.querySelector("#plant1-stage-text");
let p1img = document.querySelector(".plant1-img");
let p1wb = document.querySelector(".water-badge");
let p1fb = document.querySelector(".fertilizer-badge");
let p1b = document.querySelector(".plant-button");
let p1os = document.querySelector(".options-slot");
let p1ps = document.querySelector(".planted-slot");

const harvestButton = document.querySelector("#harvest-button");

// ===============================JAVASCRIPT VARIABLES========================================

let waterBadge = false;
let fertilizerBadge = false;
let second = 1000;
let minute = 60000;

function refreshResources() {
  waterValue.textContent = `Water: ${resources.water}`;
  fertilizerValue.textContent = `Fertilizer: ${resources.fertilizer}`;
  gemValue.textContent = `Diamond: ${resources.diamond}`;
}

function refreshPlant1() {
  p1ws.textContent = `Water: ${plant1.water}`;
  p1fs.textContent = `Fertilizer: ${plant1.fertilizer}`;
  p1s.textContent = `Stage: ${plant1.stage}/3 (${plant1.stageName})`;
  plantStageChanger();
}

function plantStageChanger() {
  if (plant1.totalWater === 0 && plant1.totalFertilizer === 0) {
    plant1.stage = 1;
    plant1.stageName = "Seedling";
    p1img.setAttribute("src", "./resources/seed.png");
    harvestButton.setAttribute("disabled", true);
  }
  if (
    plant1.totalWater >= plant1.stageFlower[0] &&
    plant1.totalFertilizer >= plant1.stageFlower[1]
  ) {
    plant1.stage = 2;
    plant1.stageName = "Flower";
    p1img.setAttribute("src", "./resources/flower.png");
  }
  if (
    plant1.totalWater >= plant1.stageBloom[0] &&
    plant1.totalFertilizer >= plant1.stageBloom[1]
  ) {
    plant1.stage = 3;
    plant1.stageName = "Bloom";
    p1img.setAttribute("src", "./resources/bloom.png");
    harvestButton.removeAttribute("disabled");
  }
}

function reducePlantWater() {
  if (plant1.water === 0) {
    clearInterval(this);
  } else {
    plant1.water -= 1;
    badgeShow();
  }
  refreshPlant1();
}

function reducePlantFertilizer() {
  if (plant1.fertilizer === 0) {
    clearInterval(this);
  } else {
    plant1.fertilizer -= 1;
    badgeShow();
  }
  refreshPlant1();
}

function reducePlantWaterFertlizer() {
  setInterval(reducePlantWater, second * 20); //CHANGE TO waterTimeReduce
  setInterval(reducePlantFertilizer, second * 30); //CHANGE TO fertilizerTimeReduce
}

function badgeShow() {
  if (plant1.water === 0) {
    p1wb.classList.remove("hide");
  } else if (plant1.water === 1) {
    p1wb.classList.add("hide");
  }

  if (plant1.fertilizer === 0) {
    p1fb.classList.remove("hide");
  } else if (plant1.fertilizer === 1) {
    p1fb.classList.add("hide");
  }

  if (plant1.stage === 3) {
    p1wb.classList.add("hide");
    p1fb.classList.add("hide");
  }
}

function harvestPlant() {
  if (plant1.stage === 3) {
    plant1 = { ...plantReset };
    resources.diamond += 1000;
    refreshResources();
    refreshPlant1();
    console.log("Successfully Harvested");
    p1os.style.display = "block";
    p1ps.style.display = "none";
    badgeShow();
  } else {
    console.log("Not yet ready");
  }
}

function plantButton() {
  if (resources.diamond >= 500) {
    resources.diamond -= 500;
    refreshResources();
    p1os.style.display = "none";
    p1ps.style.display = "flex";
  } else {
    console.log("Do not have enough diamonds");
  }
}

// function hackStage2() {
//   //ADMIN PURPOSE
//   plant1.totalWater = 10;
//   plant1.totalFertilizer = 5;
//   refreshPlant1();
// }

function hackStage3() {
  //ADMIN PURPOSE
  plant1.totalWater = 9;
  plant1.totalFertilizer = 6;
  refreshPlant1();
  badgeShow();
}

// MAIN
refreshResources();
refreshPlant1();
reducePlantWaterFertlizer();
badgeShow();
p1ps.style.display = "none";
