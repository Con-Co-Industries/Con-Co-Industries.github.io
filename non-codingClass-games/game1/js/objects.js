const FRAME_RATE = 60;
const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

//Event Handler Vars//
var DownPressed = false;
var UpPressed = false;
var RightPressed = false;
var LeftPressed = false;
var SpacePressed = false;
var oPressed = false;
var sPressed = false;

//variables//
var x = 0;
var y = 0;
var speedX = 0;
var speedY = 0;
var gravity = speedY + 1;
var frictionVar = 2.1;
var roomNum = 0;

//Background Object//
var boardObj = {} 
boardObj.id = "#board";
boardObj.x = parseFloat($(boardObj.id).css("left"));;
boardObj.y = parseFloat($(boardObj.id).css("top"));;
boardObj.width = $(boardObj.id).width();
boardObj.height = $(boardObj.id).height();
boardObj.color = boardObj.id.css("background-color");

//PLayer Object//
var playerObj = { x: 1, y: canvas.height - 103, width: 50, height: 50, color: "rgb(153, 217, 234)", speedX: 0, speedY: 0, atkMult: 1, lvl: 1, physResist: .80, health: 100};

//Terrain Objects//
var terrainObjList = [];
function createTerrain($id, x, y, width, height, color){
    $("<div>").appendTo("#board")
        .addClass(".terrain")
        .attr("id", $id)
        .css('left', x)
        .css('top', y)
        .css('width', width)
        .css('height', height)
        .css('background-color', color);
    
    terrainObjList.push(TerrainFactory($id));
}

function TerrainFactory($id){ 
    var element = {};
    element.class = ".terrain"
    element.id = $id;
    element.x = parseFloat($(element.id).css("left"));
    element.y = parseFloat($(element.id).css("top"));
    element.width = $(element.id).width();
    element.height = $(element.id).height();
    element.left = element.x; //to make the code more readable, I just added a left right up and down to everything 
    element.right = element.x + element.width;
    element.top = element.y;
    element.bottom = element.y + element.height;
    element.color = $(element.id).css("background-color");
    return element;
}

//room Door Objects//
var doorObjList = [];
function createDoorObj($id, x, y, width, height, direction){
    $("<div>").appendTo("#board")
        .addClass(".roomDoor")
        .attr("id", $id)
        .css('left', x)
        .css('top', y)
        .css('width', width)
        .css('height', height);
    
    doorObjList.push(DoorObjFactory($id,direction));
}


function DoorObjFactory($id,direction){ 
    var element = {};
    element.class = ".roomDoor"
    element.id = $id;
    element.x = parseFloat($(element.id).css("left"));
    element.y = parseFloat($(element.id).css("top"));
    element.width = $(element.id).width();
    element.height = $(element.id).height();
    element.left = element.x; //to make the code more readable, I just added a left right up and down to everything 
    element.right = element.x + element.width;
    element.top = element.y;
    element.bottom = element.y + element.height;
    element.direction = direction;
    return element;
}

//Enemy Objects//
var enemyObjList = {}
function createNewEnemy($class,$id,picture,health,physResist,magResist){
    enemyObjList.push(EnemyFactory($class,$id,picture,health,physResist,magResist));
}
function EnemyFactory($class,$id,picture,health,physResist,magResist){ 
    var element = {};
    element.class = $class;
    element.id = $id;
    element.picture = picture;
    element.health = health;
    element.physResist = physResist;
    element.magResist = magResist;
    return element;
}

var combatBtnObjList = []
function createCombatBtns($id, x, y, width, height, text){
    $("<button>").appendTo("#board")
        .addClass(".combatButton")
        .attr("id", $id)
        .css('left', x)
        .css('top', y)
        .css('width', width)
        .css('height', height)
        .html("<p>" + text + "</p>");
    
        combatBtnObjList.push(CombatButtonFactory($id,text));
}
function CombatButtonFactory($id,text){ 
    var element = {};
    element.class = ".combatButton"
    element.id = $id;
    element.x = parseFloat($(element.id).css("left"));
    element.y = parseFloat($(element.id).css("top"));
    element.width = $(element.id).width();
    element.height = $(element.id).height();
    element.left = element.x; //to make the code more readable, I just added a left right up and down to everything 
    element.right = element.x + element.width;
    element.top = element.y;
    element.bottom = element.y + element.height;
    element.actualTxt = text;
    return element;
}

/*
var featherImage = document.getElementById("feather") //
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
*/
