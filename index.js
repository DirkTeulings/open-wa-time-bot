const wa = require('@open-wa/wa-automate');

//const chatName = "Alleen coole mensen😎😎";
const chatName = "Film stickers chat";

wa.create().then(client => start(client));

function start(client) {
    client.getAllGroups(false).then(data => {
        console.log("Total chats found: " + data.length);
        for(var i = 0; i < data.length; i++) {
            if (data[i].name == chatName) {
                console.log("Chat ID (" + chatName + "): " + data[i].id);
                stream(client, data[i].id);
            }
        }
    });
}

async function stream(client, id) {
    (async function timer() {
        var d = new Date();
        var n = addZero(d.getMinutes());
        var h = addZero(d.getHours());

        await client.sendText(id, "Het is " + h + ":" +  n + " uur");

        setTimeout(timer, 1000 * 60);
    })();
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}