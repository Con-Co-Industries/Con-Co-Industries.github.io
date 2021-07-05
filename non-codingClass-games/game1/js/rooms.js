function changeRoom() {
    if (roomNum === 0) {
        "#board".css("background-color", "green") // sets the background color of #board to "green"
        terrainObjList = [
            {x: 0, y: canvas.height - 50, width: 450, height: 40, color: "gray", type: "terrain"},
            {x: 550, y: canvas.height - 50, width: 450, height: 40, color: "gray", type: "terrain"},
            {x: canvas.width -10, y: 0, width: 75, height: 200, color: "gray", type: "terrain"},
            {x: canvas.width -10, y: canvas.height - 200, width: 75, height: 200, color: "gray", type: "terrain"},
        ];
        doorObjList = [
            {x: canvas.width + 1, y: -1, width: 101, height: canvas.height + 2, color: "magenta", direction: "right", type: "roomDoor"},
            {x: -101, y: -1, width: 101, height: canvas.height + 2, color: "magenta", direction: "left", type: "roomDoor"},
            {x: -2, y: -102, width: canvas.width +4, height: 101, color: "magenta", direction: "above", type: "roomDoor"},
            {x: -2, y: canvas.height +1, width: canvas.width +4, height: 101, color: "magenta", direction: "below", type: "roomDoor"},
        ]
        surroundingRoom = {
            above: null,
            below: null,
            left: null,
            right: 1,
        }
    }
    if (roomNum === 1) {
        backgroundObj.color = "purple";
        terrainObjList = [
            {x: -1, y: 0, width: canvas.width -49, height: 200, color: "gray", type: "terrain"},
            {x: -1, y: canvas.height - 200, width: canvas.width - 49, height: 200, color: "gray", type: "terrain"},
            {x: canvas.width-50, y: 0, width: 50, height: canvas.height, color: "black", type: "terrain"},           
    
        ];
        doorObjList = [
            {x: -100, y: -1, width: 101, height: canvas.height + 1, color: "magenta", direction: "left", type: "roomDoor"},
        ]
        surroundingRoom.left = 0;
        surroundingRoom.right = null;
    }
}
