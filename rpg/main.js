const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $heroName = document.querySelector("#hero-name");
const $heroLevel = document.querySelector("#hero-level");
const $heroHp = document.querySelector("#hero-hp");
const $heroXp = document.querySelector("#hero-xp");
const $heroAtt = document.querySelector("#hero-att");
const $monsterName = document.querySelector("#monster-name");
const $monsterHp = document.querySelector("#monster-hp");
const $monsterAtt = document.querySelector("#monster-att");
const $message = document.querySelector("#message");

const hero = {
  name: "",
  lev: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
  attack(monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  },
//   attack : function(monster){
//     monster.hp -= this.att;
//     this.hp -= monster.att;
//   };
// 이게 위에 코드이다.

  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  },
}; // 객체 안에 들어있는 this는 객체를 의미한다. 위에서 this.xp는 hero.xp와 같다.
let monster = null;
const monsterList = [
  { name: "슬라임", hp: 25, att: 10, xp: 10 },
  { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
  { name: "마왕", hp: 150, att: 35, xp: 50 },
];

$startScreen.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target["name-input"].value;
  $startScreen.style.display = "none";
  $gameMenu.style.display = "block";
  $heroName.textContent = name;
  $heroLevel.textContent = `${hero.lev}Lev`;
  $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
  $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
  $heroAtt.textContent = `ATT: ${hero.att}`;
  hero.name = name;
});

$gameMenu.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target["menu-input"].value;
  if (input === "1") {
    // 모험
    $gameMenu.style.display = "none";
    $battleMenu.style.display = "block";
    //ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
    monster = JSON.parse(
      JSON.stringify(
        monsterList[Math.floor(Math.random() * monsterList.length)]
      )
    ); // 깊은복사
    //만약 참조로 monster = monsterList[0]을 하고 진행할 경우
    //원본 데이터가 수정되기 때문에 지속적으로 게임 진행을 할 수 없다.
    //이럴때는 원본데이터를 복사해서 사용해야하는데
    //이때 사용되는게 JSON.parse(JSON.stringify()) 입니다.
    //ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
    monster.maxHp = monster.hp;
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  } else if (input === "2") {
    // 휴식
  } else if (input === "3") {
    // 종료
  }
});

$battleMenu.addEventListener("submit", (event) => {
  const input = event.target["battle-input"].value;
  if (input === "1") { // 공격
    hero.attack(monster);
    monster.attack(hero);
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $monsterHp.textContent = `HP : ${monster.hp}/${monster.maxHp}`;
    $message.textContent = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`;
  } else if (input === "2") { // 회복
  } else if (input === "3") { // 도망
  }
});