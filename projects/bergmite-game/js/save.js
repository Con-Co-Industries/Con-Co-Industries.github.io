var cookie = document.cookie
parseFloat(document.cookie.split("; ").find(row => row.startsWith('game Save=')).split('=')[1].split('|').find(row => row.startsWith('x')).split(',')[1]);




function save() {
    var saveString = "saveData = x:" + playerObj.x + ", y:" + playerObj.y + ","
    document.cookie = saveString
}

function loadSave() {
    playerObj.x = parseFloat(document.cookie.split("; ").find(row => row.startsWith('game Save=')).split('=')[1].split('|').find(row => row.startsWith('x')).split(',')[1]); 
}