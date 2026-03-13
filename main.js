const goldAmountText = document.getElementById("goldAmount"); //gold amount text
const workerCostText = document.getElementById("workerCost"); //worker cost text
const buyWorkerButton = document.getElementById("buyWorker"); //buy worker button
const earnGoldButton = document.getElementById("earnGold"); //earn gold button
const workersText = document.getElementById("workers"); //workers text display
const levelText = document.getElementById("levelText"); //level text display
const xpText = document.getElementById("xpText"); //xp text display
const xpRequiredText = document.getElementById("xpRequired"); //xp required text display
const xpBar = document.getElementById("xpBar"); //xp progress bar
let gold = 0; //set initial gold amount
let goldPerSecond = 0; //set initial gold per second
let level = 1; //set initial level
let xp = 0; //set initial xp
let xpRequired = 100; //set initial xp required
const baseWorkerCost = 100; //base worker cost
const baseWorkerProduction = 5; //base worker production
const workerCostMultiplier = 1.15; //worker cost multiplier
const workerProductionMultiplier = 1.5; //worker production multiplier
const upgradeCostMultiplier = 2; //upgrade cost multiplier
let workerCount = 0; //set initial worker count
let workerCost = Math.floor(
    baseWorkerCost * Math.pow(workerCostMultiplier, workerCount),
); //set initial worker cost
let workers = []; //list of workers
earnGoldButton.addEventListener("click", () => {
    //when earn gold button is clicked
    gold += 1 + goldPerSecond / 100; //increase gold
    goldAmountText.textContent = Math.floor(gold); //update gold amount text
});
buyWorkerButton.addEventListener("click", () => {
    //when buy worker button is clicked
    if (gold >= workerCost) {
        //check if player has enough gold
        gold -= workerCost; //decrease gold
        goldAmountText.textContent = Math.floor(gold); //update gold amount text
        workerCount++; //increase worker count
        workers.push({
            //add worker to list of workers
            number: workerCount + 1,
            baseProduction: Math.floor(baseWorkerProduction),
            production: Math.floor(baseWorkerProduction),
            level: 1,
            baseUpgradeWorkerCost: Math.floor(
                workerCost * upgradeCostMultiplier,
            ),
            upgradeWorkerCost: Math.floor(workerCost * upgradeCostMultiplier),
        });
        xp += Math.floor(10 * Math.pow(1.02, workerCount - 1)); //increase xp
        updateLevelXp(); //update level and xp
        updateGoldPerSecond(); //update gold per second
        updateWorkersDisplay(); //update workers display
        workerCost = Math.floor(
            baseWorkerCost * Math.pow(workerCostMultiplier, workerCount),
        ); //update worker cost
        workerCostText.textContent = workerCost; //update worker cost text
    }
});
function updateGoldPerSecond() {
    //update gold per second
    goldPerSecond = workers.reduce(
        (total, worker) => total + worker.production,
        0,
    ); //calculate total production
    goldAmountText.textContent = gold; //update gold amount text
}
function upgradeWorker(index) {
    //upgrade worker
    const worker = workers[index]; //find worker at index
    if (gold >= worker.upgradeWorkerCost) {
        //check if player has enough gold
        gold -= worker.upgradeWorkerCost; //decrease gold
        goldAmountText.textContent = Math.floor(gold); //update gold amount text
        worker.level++; //increase worker level
        worker.production = Math.floor(
            worker.baseProduction *
                Math.pow(workerProductionMultiplier, worker.level - 1),
        ); //increase worker production
        worker.upgradeWorkerCost = Math.floor(
            worker.baseUpgradeWorkerCost *
                Math.pow(upgradeCostMultiplier, worker.level - 1),
        ); //increase worker upgrade cost
        xp += Math.floor(10 * Math.pow(1.02, worker.level - 1 + index)); //increase xp
        updateLevelXp(); //update level and xp
        updateGoldPerSecond(); //update gold per second
        updateWorkersDisplay(); //update workers display
    }
}
function updateWorkersDisplay() {
    //update workers display
    workersText.textContent = ""; //clear workers text
    workers.forEach((worker, index) => {
        //repeat for each worker
        const workerDiv = document.createElement("div"); //create worker div
        workerDiv.textContent = `Worker #${worker.number} - Level: ${worker.level}, Production: ${worker.production} Gold/s`; //add worker info to worker div
        const upgradeButton = document.createElement("button"); //create upgrade button
        upgradeButton.textContent = `Upgrade (Cost: ${worker.upgradeWorkerCost} Gold)`; //add upgrade button text
        upgradeButton.addEventListener("click", () => upgradeWorker(index)); //add upgrade button event listener
        workerDiv.appendChild(document.createElement("br")); //add line break
        workerDiv.appendChild(upgradeButton); //add upgrade button to worker div
        workersText.appendChild(workerDiv); //add worker div to workers text
    });
}
function updateLevelXp() {
    //update level and xp
    if (xp >= xpRequired) {
        //check if player has enough xp
        level++; //increase level
        xp -= xpRequired; //decrease xp
        xpRequired = Math.floor(100 * Math.pow(1.5, level - 1)); //increase xp required
        levelText.textContent = level; //update level text
        xpText.textContent = xp; //update xp text
        xpRequiredText.textContent = xpRequired; //update xp required text
        xpBar.max = xpRequired; //update xp progress bar max
    }
    xpText.textContent = xp; //update xp text
    xpRequiredText.textContent = xpRequired; //update xp required text
    xpBar.value = xp; //update xp progress bar
}
setInterval(() => {
    //increase gold every second
    gold += goldPerSecond; //increase gold
    goldAmountText.textContent = Math.floor(gold); //update gold amount text
    updateWorkersDisplay(); //update workers display
}, 1000); //update every second
