/*
    notes:
    - different kinds of berries
    - sections: shop, farm, log, encyclopedia (quests?)
    - automated farming
*/

/* variables + setup */

/*
    values:
    0 = empty
    1 = seed (growing)
    anything else = berry name
*/
// prettier-ignore
const farm = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const baseCost = 
{
    seeds: 5,
    berry: 1
};

const baseTime =
{
    berry: 5
}

let money = 20;
let seeds = 0;
let berries = 0;

load();
updateValues();
window.setInterval(save(), 300000);
window.onbeforeunload = function() {
    save();
    return null; // not sure why this works but it does thank you stackoverflow
}

/* shop functions */

// used in "buy a seed packet" button
function buySeeds() {
    let cost = getBaseCost("seeds");
    const seedAmt = 3 + Math.floor(Math.random() * 5); // integer from 3 to 7

    if (money >= cost) {
        money -= cost;
        seeds += seedAmt;
        updateValues();
    } else {
        log("not enough money!");
    }
}

function sellBerry(berry) {
    let price = getBaseCost(berry);

    if (berries > 0) {
        money += price;
        berries--;
        updateValues();
    } else {
        log("no more berries left!");
    }
}

/* farm functions */

function farmHandler(r, c) {
    const farmValue = farm[r - 1][c - 1];
    console.log(farmValue);
    if (farmValue == 0) {
        plantSeed(r, c, "berry"); // change later
    } else if (farmValue == 1) {
        log("wait for the berry to finish growing!");
    } else {
        collectBerry(r, c);
    }
}

function plantSeed(r, c, berry) {
    const id = "space-r" + r + "c" + c; // button id

    if (seeds > 0) {
        seeds--;
        farm[r - 1][c - 1] = 1;
        updateValues();

        let seconds = getBaseTime(berry);
        document.getElementById(id).innerHTML = "seconds left: " + seconds;
        const seedInterval = setInterval(function() {
            seconds--;
            if (seconds <= 1) {
                clearInterval(seedInterval);
            }
            document.getElementById(id).innerHTML = "seconds left: " + seconds;
        }, 1000);

        setTimeout(function() {
            farm[r - 1][c - 1] = berry;
            document.getElementById(id).innerHTML = berry + " is available to collect";
            updateValues();
        }, 1000 * getBaseTime(berry));
        
    } else {
        log("buy some seeds first!");
    }
}

function collectBerry(r, c) {
    const id = "space-r" + r + "c" + c; // button id
    const berryAmt = 5 + Math.floor(Math.random() * 4); // integer from 5 to 8

    farm[r - 1][c - 1] = 0;
    berries += berryAmt;
    document.getElementById(id).innerHTML = "empty";
    updateValues();
}

/* other functions */

function save() {
    const save = {
        money: money,
        seeds: seeds,
        berries: berries
    }
    localStorage.setItem("save", JSON.stringify(save));
}

function load() {
    const save = JSON.parse(localStorage.getItem("save"));
    if (typeof save.money !== "undefined") money = save.money;
    if (typeof save.seeds !== "undefined") seeds = save.seeds;
    if (typeof save.berries !== "undefined") berries = save.berries;
}

function changeTab(tab) {
    const elems = document.getElementsByClassName("tab");
    for (const e of elems) {
        e.style.display = "none";
    }
    document.querySelector("." + tab).style.display = "flex";
}

function updateValues() {
    document.getElementById("money").innerHTML = "money: $" + money;
    document.getElementById("seeds").innerHTML = "seeds: " + seeds;
    document.getElementById("berries").innerHTML = "berries: " + berries;
}

function getBaseCost(item) {
    if (item == "seeds") {
        return baseCost.seeds;
    } else if (item == "berry") {
        return baseCost.berry;
    } else {
        console.log("broken call to getBaseCost (item = " + item + ")");
    }
}

function getBaseTime(item) {
    if (item == "berry") {
        return baseTime.berry;
    } else {
        console.log("broken call to getBaseCost (item = " + item + ")");
    }
}

function log(msg) {
    const text = document.querySelector(".log").innerHTML;
    document.getElementById("log").innerHTML = msg + "\n\n" + text;
}