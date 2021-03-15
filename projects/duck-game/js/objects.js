//Background Object//
var backgroundObj = { x: 0, y: 0, width: canvas.width, height: canvas.height, color: "green" };
//PLayer Object//
var playerObj = { x: 1, y: canvas.height - 103, width: 50, height: 50, color: "blue", speedX: 0, speedY: 0 };
//Terrain Objects//
terrainObjList.push({
    x: 0, y: canvas.height - 50, width: 450, height: 40, color: "gray", type: "terrain"
})
terrainObjList.push({
    x: 550, y: canvas.height - 50, width: 450, height: 40, color: "gray", type: "terrain"
})
//NPC Objects//
npcObjList.push ({
    x:330, y:330, width: 40, height: 40, color: "black", name: "Ben Dover", greeting: "But, there's just so many lions! Do you even know how big a billion is? There's no way the Pokémon would win."
})

//var objList = [
    //{x: 550, y: canvas.height - 50, width: 450, height: 40, color: "gray", type: "terrain"},
    //{x:330, y:330, width: 40, height: 40, color: "black", name: "Ben Dover", greeting: "But, there's just so many lions! Do you even know how big a billion is? There's no way the Pokémon would win."},

//]

//var greetingList = [
    //{greeting : 'hello', id: 1},
    //{greeting : 'hi', id: 1}
//] 