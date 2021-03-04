//Background Object//
var backgroundObj = { x: 0, y: 0, width: canvas.width, height: canvas.height, color: "green" };
//PLayer Object//
var playerObj = { x: 1, y: canvas.height - 103, width: 50, height: 50, color: "blue", speedX: 0, speedY: 0 };
//Terrain Objects//
terrainObjList.push({
    x: 0, y: canvas.height - 50, width: 450, height: 40, color: "gray"
})
terrainObjList.push({
    x: 550, y: canvas.height - 50, width: 450, height: 40, color: "gray"
})
//NPC Objects//