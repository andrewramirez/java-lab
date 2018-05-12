// Classes
class Computer {
    constructor(name, health) {
        this.name = name;
        this.health = health;
    }
    generateAttackDamage() {
        return getRandom(5)
    }
}

class Character extends Computer {
    constructor(name, health, healsRemaining) {
        super(name, health);
        this.healsRemaining = healsRemaining;
        this.wins = 0;
    }
    generateAttackDamage() {
        return getRandom(3);
    }

    generateHeal() {
        return getRandom(10);
    }

    heal() {
        this.health += getRandom(10);
        this.healsRemaining--;
    }
}
var TOTAL_WINS = 5;
var COMPUTER_STARTING_HEALTH = 10;

// Global Variables

var userHealth = 40;
var grantHealth = 10;
var wins = 0;

// startGame();
var startButton = document.getElementById("startButton");
startButton.onclick = function () {
  document.getElementById("game-wrapper").style.display = "block";
  document.getElementById("start-wrapper").style.display = "none";
  startGame();
}
function startGame() {
    var play = prompt("Do you want to play a game?");
    if (play.toLowerCase() === "yes") {
        var userName = prompt("What is your name?");
        startCombat(userName, 1, 7);
    } else {
        prompt('Game not started, you must type "yes" to begin the game.');

    }
}
// Play Game

var playerName = document.getElementById("playerName");
function setPlayerName(user) {
  playerName.innerText = user;
}

function startCombat(username) {

    var user = new Character(username, 40, 2);
    var grant = new Computer('grant', COMPUTER_STARTING_HEALTH);

    while (user.wins < TOTAL_WINS && user.health > 0) {
        var shouldAttack = prompt("Do you want to attack, quit or heal");

        if (shouldAttack.toLowerCase() === "quit") {
            alert("You failed and suck at life");
            //    This lets you exit your Javascript
            return;
        }
        if (shouldAttack.toLowerCase() === "attack") {
            user.health -= grant.generateAttackDamage();
            grant.health -= user.generateAttackDamage();
        }
        if (shouldAttack === "heal") {
            user.heal();
            console.log(`${user.name} has healed and has ${user.health}`)
        }
        console.log(`${user.name} has ${user.health} health remaining`);
        console.log(`Grant has ${grant.health} health remaining`);

        if (grant.health < 1) {
            user.wins++;
            grant.health = COMPUTER_STARTING_HEALTH;
        }

        console.log(`${user.name} has ${user.wins} victory.`);

        if (user.healsRemaining === 0) {
            grant.generateAttackDamage();
            user.generateAttackDamage();
            console.log(`${user.name} has ${user.health} health left`);
            console.log(`Grant has ${grant.health} health left`);
        }
    }


    if (user.wins === TOTAL_WINS) {
        alert(`${user.name} won and is the greatest`);
    } else {
        alert('Grant won and you fail');
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * max) + 1;

}