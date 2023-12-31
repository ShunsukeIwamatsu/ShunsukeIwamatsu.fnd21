'use strict'
// Please don't delete the 'use strict' line above


//【パート】前提条件
//html上の要素を取得する
const pokemonBattle = document.getElementById("pokemon-battle");

const pokemonA = document.getElementById("pokemonA");
const pokemonB = document.getElementById("pokemonB");
const pokemonAstatus = document.getElementById("pokemonAstatus");
const pokemonBstatus = document.getElementById("pokemonBstatus");
const battlebutton = document.getElementById("battlebutton");
const battleStatus = document.getElementById("battleStatus");




//【パート】ポケモン選択
//ランダムでポケモンを選ぶ関数
function selectPokemon(){
  const num = Math.floor( Math.random() * allPokemon.length ) ;
  return allPokemon[num];
}
// console.log(selectPokemon().Number);


//選択したポケモンのステータスを表示させる関数
function statusPokemon(pokemon, pokemonStatus){
  const idStatus = pokemonStatus 
  
  //選択されたポケモンのステータスを表示
  const pokemonNumber = document.createElement("p");
  pokemonNumber.textContent = "Number：  " + pokemon["Number"];
  idStatus.appendChild(pokemonNumber);

  const pokemonName = document.createElement("p");
  pokemonName.textContent = "Name：  " + pokemon["Name"];
  idStatus.appendChild(pokemonName);
  
  const pokemonWeight = document.createElement("p");
  pokemonWeight.textContent = "Maximum Weigth：  " + pokemon["Weight"]["Maximum"];
  idStatus.appendChild(pokemonWeight);
  
  const pokemonHeight = document.createElement("p");
  pokemonHeight.textContent = "Maximum Heigth：  " + pokemon["Height"]["Maximum"];
  idStatus.appendChild(pokemonHeight);
  
  const pokemonMaxCP = document.createElement("p");
  pokemonMaxCP.textContent = "MaxCP：  " + pokemon["MaxCP"];
  idStatus.appendChild(pokemonMaxCP);

  const pokemonMaxHP = document.createElement("p");
  pokemonMaxHP.textContent = "MaxHP：  " + pokemon["MaxHP"];
  idStatus.appendChild(pokemonMaxHP);
  
  const pokemonTypes = document.createElement("p");
  pokemonTypes.textContent = "Types：  " + pokemon["Types"];
  idStatus.appendChild(pokemonTypes);
  
  const pokemonResistant = document.createElement("p");
  pokemonResistant.textContent = "Resistant：  " + pokemon["Resistant"];
  idStatus.appendChild(pokemonResistant);
  
  const pokemonWeaknesses = document.createElement("p");
  pokemonWeaknesses.textContent = "Weaknesses：  " + pokemon["Weaknesses"];
  idStatus.appendChild(pokemonWeaknesses);

  const pokemonAbout = document.createElement("p");
  pokemonAbout.textContent = "About：  " + pokemon["About"];
  idStatus.appendChild(pokemonAbout);

  const pokemonImg = document.createElement("img");
  pokemonImg.src = "pokemonRedGreen.jpg";
  idStatus.appendChild(pokemonImg);
}



let selectedPokemonA = {};
let selectedPokemonB = {};
let hpA = 0;
let hpB = 0;


//マウスクリックイベントと組み合わせる関数
function dispStatusA(){
  selectedPokemonA = selectPokemon();
  hpA = selectedPokemonA.MaxHP;
  statusPokemon(selectedPokemonA, pokemonAstatus);
}

function dispStatusB(){
  selectedPokemonB = selectPokemon();
  hpB = selectedPokemonB.MaxHP;
  statusPokemon(selectedPokemonB, pokemonBstatus);
}

//自分のポケモン、相手のポケモンボタンを押したときの動作
pokemonA.addEventListener("click", dispStatusA);
pokemonB.addEventListener("click", dispStatusB);




// 【パート】バトル
// ポケモンA → Bに攻撃する関数
function makeBattleAtoB(selectedPokemonA, selectedPokemonB){
  const nameA = selectedPokemonA.Name;
  const nameB = selectedPokemonB.Name;

  const num = Math.floor( Math.random() * selectedPokemonA["Special Attack(s)"].length ) ;
  const attackA = selectedPokemonA["Special Attack(s)"][num]["Name"];
  const damageA = 5*selectedPokemonA["Special Attack(s)"][num]["Damage"];

  hpB = hpB - damageA;

  if(hpB > 0){
    return `<font color="red">【 ${nameA} の攻撃】 </font>${attackA}： ${nameB}に${damageA}ダメージ　 => 　${nameB}のHP：${hpB}`;
  }else{
    return `<font color="red">【 ${nameA} の攻撃】 </font>${attackA}： ${nameB}に${damageA}ダメージ　 => 　${nameB}のHP：0
    <font color="red"> => ${nameA} の勝利！ </font>`;
  }
}

// ポケモンB → Aに攻撃する関数
function makeBattleBtoA(selectedPokemonA, selectedPokemonB){
  const nameA = selectedPokemonA.Name;
  const nameB = selectedPokemonB.Name;

  const num = Math.floor( Math.random() * selectedPokemonB["Special Attack(s)"].length ) ;
  const attackB = selectedPokemonA["Special Attack(s)"][num]["Name"];
  const damageB = 5*selectedPokemonA["Special Attack(s)"][num]["Damage"];

  hpA = hpA - damageB;

  if(hpA > 0){
    return `<font color="green">【 ${nameB} の攻撃】</font>${attackB}： ${nameA}に${damageB}ダメージ　 => 　${nameA}のHP：${hpA}`;
  }else{
    return `<font color="green">【 ${nameB} の攻撃】</font>${attackB}： ${nameA}に${damageB}ダメージ　 => 　${nameA}のHP：0
    <font color="green">　=> ${nameB} の勝利！ </font>`;
  }
  
}

// マウスクリックイベントと組み合わせる関数
function dispStatusBattle(){
  const pokemonBattle = document.createElement("p");

  const num = Math.floor( Math.random() * 2 ) ;
    if(num === 0){
      pokemonBattle.innerHTML = makeBattleAtoB(selectedPokemonA, selectedPokemonB);
    } else{
      pokemonBattle.innerHTML = makeBattleBtoA(selectedPokemonA, selectedPokemonB);
    }
  battleStatus.appendChild(pokemonBattle);
}

//「バトルを進める」ボタンを押したときの動作
battlebutton.addEventListener("click", dispStatusBattle);


