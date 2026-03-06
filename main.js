const goldAmountText = document.getElementById("goldAmount");
const workerCostText = document.getElementById("workerCost");
const buyWorkerButton = document.getElementById("buyWorker");
const earnGoldButton = document.getElementById("earnGold");
const workersText = document.getElementById("workers");
let gold = 0;
let goldPerSecond = 0;
const baseWorkerCost = 100;
const baseWorkerProduction = 5;
const workerCostMultiplier = 1.15;
const workerProductionMultiplier = 1.5;
const upgradeCostMultiplier = 2;
let workerCount = 0;
let workerCost = Math.floor(
    baseWorkerCost * Math.pow(workerCostMultiplier, workerCount),
);
let workers = [];
earnGoldButton.addEventListener("click", () => {
    gold += 1 + goldPerSecond / 100;
    goldAmountText.textContent = Math.floor(gold);
});
buyWorkerButton.addEventListener("click", () => {
    if (gold >= workerCost) {
        gold -= workerCost;
        goldAmountText.textContent = Math.floor(gold);
        workerCount++;
        workers.push({
            number: workerCount + 1,
            baseProduction: Math.floor(baseWorkerProduction),
            production: Math.floor(baseWorkerProduction),
            level: 1,
            baseUpgradeWorkerCost: Math.floor(
                workerCost * upgradeCostMultiplier,
            ),
            upgradeWorkerCost: Math.floor(workerCost * upgradeCostMultiplier),
        });
        updateGoldPerSecond();
        updateWorkersDisplay();
        workerCost = Math.floor(
            baseWorkerCost * Math.pow(workerCostMultiplier, workerCount),
        );
        workerCostText.textContent = workerCost;
    }
});
function updateGoldPerSecond() {
    goldPerSecond = workers.reduce(
        (total, worker) => total + worker.production,
        0,
    );
    goldAmountText.textContent = gold;
}
function upgradeWorker(index) {
    const worker = workers[index];
    if (gold >= worker.upgradeWorkerCost) {
        gold -= worker.upgradeWorkerCost;
        goldAmountText.textContent = Math.floor(gold);
        worker.level++;
        worker.production = Math.floor(
            worker.baseProduction *
                Math.pow(workerProductionMultiplier, worker.level - 1),
        );
        worker.upgradeWorkerCost = Math.floor(
            worker.baseUpgradeWorkerCost *
                Math.pow(upgradeCostMultiplier, worker.level - 1),
        );
        updateGoldPerSecond();
        updateWorkersDisplay();
    }
}
function updateWorkersDisplay() {
    workersText.innerText = "";
    workers.forEach((worker, index) => {
        const workerDiv = document.createElement("div");
        workerDiv.textContent = `Worker #${worker.number} - Level: ${worker.level}, Production: ${worker.production} Gold/s`;
        const upgradeButton = document.createElement("button");
        upgradeButton.textContent = `Upgrade (Cost: ${worker.upgradeWorkerCost} Gold)`;
        upgradeButton.addEventListener("click", () => upgradeWorker(index));
        workerDiv.appendChild(document.createElement("br"));
        workerDiv.appendChild(upgradeButton);
        workersText.appendChild(workerDiv);
    });
}
setInterval(() => {
    gold += goldPerSecond;
    goldAmountText.textContent = Math.floor(gold);
    updateWorkersDisplay();
}, 1000);
