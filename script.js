let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Palo"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'Palo', power: 5 },
  { name: 'Daga', power: 15 },
  { name: 'Hacha', power: 40 },
  { name: 'Espada', power: 70 },
  { name: 'Espada de fuego', power: 100 },
  { name: 'Espada mágica', power: 120 },
  { name: 'Alberga Almas ', power: 150 }

];
const monsters = [
  {
    name: "Esquelethor",
    level: 2,
    health: 15,
    image: "images/esqueleto.png"
  },
  {
    name: "Maldito Arbol",
    level: 8,
    health: 60,
    image: "images/arbol.png"
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
    image: "images/dragon.png"
  }
]
const locations = [
  {
    name: "pueblo",
    "button text": ["Ir ala tienda", "Ir a la cueva", "Luchar contra el dragón"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Estás en la plaza del pueblo. Ves un cartel que dice \"Tienda\".",
    image: "images/plaza.png"
  },
  {
    name: "Tienda",
    "button text": ["Comprar 10 de salud (10 oro)", "Comprar arma (30 oro)", "Volver al pueblo"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Estás en la tienda. ¿Qué quieres comprar?",
    image: "images/tienda_medival.png"
  },
  {
    name: "Cueva",
    "button text": ["Pelear con slime", "Pelear con bestia con colmillos", "Volver al pueblo"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "acabas de entrar a la cueva. ves algun monstruo.",
    image: "images/cueva.png"
  },
  {
    name: "Pelear",
    "button text": ["Atacar", "Esquivar", "Correr"],
    "button functions": [attack, dodge, goTown],
    text: "Estas luchando contra un monstruo. ¿Qué quieres hacer?",
    image: "images/cueva.png"
  },
  {
    name: "Monstruo derrotado",
    "button text": ["Volver al pueblo", "Volver al pueblo", "Ir al easter egg"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'El monstruo grita "Arg!" mientras muere. Ganas puntos de experiencia y encuentras oro.',
    image: "images/kill.png"
  },
  {
    name: "Perdiste",
    "button text": ["REPETIR?", "REPETIR?", "REPETIR?"],
    "button functions": [restart, restart, restart],
    text: "Has Muerto. &#x2620;",
    image: "images/derrota.png"
  },
  { 
    name: "GANASTE!", 
    "button text": ["REPETIR?", "REPETIR?", "REPETIR?"], 
    "button functions": [restart, restart, restart], 
    text: "Conceguiste derrotar al dragón! HAS GANADO EL JUEGO! &#x1F389;",
    image: "images/win.png"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Volver al pueblo"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Encuentras un juego secreto. Elige un número de arriba. Se elegirán diez números al azar entre el 0 y el 10. Si el número que eliges coincide con uno de los números aleatorios, ¡ganas!",
    image: "images/egg.png"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  
  // Cambiar la imagen de fondo según la localización
  if (location.image) {
    document.body.style.backgroundImage = `url('${location.image}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  }
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "No tienes suficiente oro para comprar salud.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Estas equipado con " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " Inventario: " + inventory;
    } else {
      text.innerText = "No tienes suficiente oro para comprar un arma.";
    }
  } else {
    text.innerText = "Ya tienes el arma más poderosa!";
    button2.innerText = "Vender arma por 15 oro";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Vendiste el arma " + currentWeapon + ".";
    text.innerText += " Inventario: " + inventory;
  } else {
    text.innerText = "¡No vendas tu única arma!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  
  // Cambiar el fondo según el monstruo
  if (monsters[fighting].image) {
    document.body.style.backgroundImage = `url('${monsters[fighting].image}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  }
}

function attack() {
  text.innerText = "El " + monsters[fighting].name + " te ataca.";
  text.innerText += "atacas con tu " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Te falló.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tu " + inventory.pop() + " se rompio.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Esquivas el ataque del " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Palo"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "escojiste " + guess + ". Aquí están los números aleatorios:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "¡Correcto! ¡Ganaste 20 de oro!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "¡Incorrecto! ¡Pierdes 10 de salud!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}