//Canvas Set Up Vars//
var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");
var featherImage = document.getElementById("feather")
var bergmiteImage = document.getElementById("Bergmite")

//variables//
var x = 0;
var y = 0;
var speedX = 0;
var speedY = 0;
var gravity = speedY + 1;
var frictionVar = 2.1;
var DownPressed = false;
var UpPressed = false;
var RightPressed = false;
var LeftPressed = false;
var SpacePressed = false;
var oPressed = false;
var sPressed = false;


//Background Object//
var backgroundObj = { x: 0, y: 0, width: canvas.width, height: canvas.height, color: "green" };

//PLayer Object//
var playerObj = { x: 1, y: canvas.height - 103, width: 50, height: 50, color: "rgb(153, 217, 234)", speedX: 0, speedY: 0, atkMult: 1, lvl: 1, physResist: .80, health: 100};

//Terrain Objects//
var terrainObjList = [];

//room Door Objects//
var doorObjList = [];


//Enemy Objects//
var enemyObjList = {
    bergmite: {name: "Bergmite", picture: bergmiteImage, attackName: "Ice Beam", health: 50, magResist: 30, physResist: 0},
}
//Button Objects//
ctx.font = 'normal 30px cursive'
//Changing Font For Correct Measurements//

var btnObj = [
    {txt: "Attack", width: ctx.measureText("Defend").width*2, height: 60, x: 50, y: 350, txtX: 150, txtY: 390, color: "white"},
    {txt: "Defend", width: ctx.measureText("Defend").width*2, height: 60, x: 275, y: 350, txtX: 365, txtY: 390, color: "white"},
    {txt: "Items", width: ctx.measureText("Defend").width*2, height: 60, x: 500, y: 350, txtX: 600, txtY: 390, color: "white"},
    {txt: "Flee", width: ctx.measureText("Defend").width*2, height: 60, x: 725, y: 350, txtX: 850, txtY: 390, color: "white"},
]
function attackDraw() {
    btnObj = [
        {txt: "Melee", width: ctx.measureText("Defend").width*2, height: 60, x: 50, y: 350, txtX: 150, txtY: 390, color: "white"},
        {txt: "Magic", width: ctx.measureText("Defend").width*2, height: 60, x: 275, y: 350, txtX: 365, txtY: 390, color: "white"},
    ] 
}
function itemDraw() {
    btnObj = [
        {txt: "Back", width: ctx.measureText("Defend").width*2, height: 60, x: 725, y: 350, txtX: 850, txtY: 390, color: "white"},
    ]
}
function defaultDraw() {
    btnObj = [
        {txt: "Attack", width: ctx.measureText("Defend").width*2, height: 60, x: 50, y: 350, txtX: 150, txtY: 390, color: "white"},
        {txt: "Defend", width: ctx.measureText("Defend").width*2, height: 60, x: 275, y: 350, txtX: 365, txtY: 390, color: "white"},
        {txt: "Items", width: ctx.measureText("Defend").width*2, height: 60, x: 500, y: 350, txtX: 600, txtY: 390, color: "white"},
        {txt: "Flee", width: ctx.measureText("Defend").width*2, height: 60, x: 725, y: 350, txtX: 850, txtY: 390, color: "white"},
    ]
}

//Save Button//
var saveBtn = [

]





//Random Crap//

//var objList = [
    //{x: 550, y: canvas.height - 50, width: 450, height: 40, color: "gray", type: "terrain"},
    //{x:330, y:330, width: 40, height: 40, color: "black", name: "Ben Dover", greeting: "But, there's just so many lions! Do you even know how big a billion is? There's no way the Pokémon would win."},

//]

//var greetingList = [
    //{greeting : 'hello', id: 1},
    //{greeting : 'hi', id: 1}
//] 