let plant1 = {
  name: "rose",
  water: 0,
  waterMax: 5,
  fertilizer: 0,
  fertilizerMax: 1,
  totalWater: 0,
  totalFertilizer: 0,
  stage: 1,
  stageName: "Seedling",
  stageFlower: 10,
  stageBloom: 20,
};

let plantReset = {
  name: "rose",
  water: 0,
  waterMax: 5,
  fertilizer: 0,
  fertilizerMax: 1,
  totalWater: 0,
  totalFertilizer: 0,
  stage: 1,
  stageName: "Seedling",
  stageFlower: 10,
  stageBloom: 20,
};

let resources = {
  water: 100,
  fertilizer: 100,
  diamond: 1000,
};

let shop = {
  buyWater100: () => {
    if (resources.diamond >= 100) {
      console.log("Successfully bought water");
      resources.diamond -= 100;
      resources.water += 100;
    } else {
      console.log("You dont have enough diamond");
    }
  },
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

let waterValue = document.querySelector("#Water");
let fertilizerValue = document.querySelector("#Fertilizer");
let gemValue = document.querySelector("#Diamond");
let p1ws = document.querySelector("#water-status-1");
let p1fs = document.querySelector("#fertilizer-status-1");
let p1s = document.querySelector("#plant1-stage-text");
let p1img = document.querySelector("#plant1-img");

const harvestButton = document.querySelector("#harvest-button");

const waterTimeReduce = 60000;
const FertilizerTimeReduce = 600000;

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
  if (plant1.totalWater >= plant1.stageFlower && plant1.totalFertilizer >= 5) {
    plant1.stage = 2;
    plant1.stageName = "Flower";
    p1img.setAttribute("src", "./resources/flower.png");
  }
  if (plant1.totalWater >= plant1.stageBloom && plant1.totalFertilizer >= 10) {
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
  }
  refreshPlant1();
}

function reducePlantFertilizer() {
  if (plant1.fertilizer === 0) {
    clearInterval(this);
  } else {
    plant1.fertilizer -= 1;
  }
  refreshPlant1();
}

function reducePlantWaterFertlizer() {
  setInterval(reducePlantWater, 500); //CHANGE TO waterTimeReduce
  setInterval(reducePlantFertilizer, 500); //CHANGE TO fertilizerTimeReduce
}

function harvestPlant() {
  if (plant1.stage === 3) {
    plant1 = { ...plantReset };
    resources.diamond += 1000;
    refreshResources();
    refreshPlant1();
    console.log("Successfully Harvested");
  } else {
    console.log("Not yet ready");
  }
}

function hackStage() {
  //ADMIN PURPOSE
  plant1.totalWater = 20;
  plant1.totalFertilizer = 10;
  refreshPlant1();
}

// MAIN
refreshResources();
refreshPlant1();
reducePlantWaterFertlizer();
