import { WebSocket, WebSocketServer } from "ws";
import db from "../../database/index.js"

/**
 * Parses token value from cookies
 * @param {string} cookies 
 * @returns string if token existed, otherwise null
 */
function parseCookies(cookies) {
    if (!cookies) return null;
    const tokenCookie = cookies.split(';').find(s => s.trim().startsWith('token='))
    if (!tokenCookie) return null;
    const tokenValue = tokenCookie.split('=')[1];
    return tokenValue;
}

/**
 * 
 * @param {WebSocketServer} wss 
 */
function refreshOnlineClients(wss) {
    const ids = {};
    [...wss.clients].forEach(c => ids[c.userId] = c.userId);
    const payload = {
        "online": ids
    };
    [...wss.clients].forEach(client => {
        client.send(JSON.stringify(payload))
    })
}

/**
 * Initializes timers to determine when to terminate the connection
 * @param {WebSocket} conn 
 * @param {WebSocketServer} wss
 */
function initConnectionTimer(conn, wss) {
    conn.isAlive = true;
    conn.timer = setInterval(() => {
        conn.ping();
        conn.deathTimer = setTimeout(() => {
            conn.isAlive = false;
            clearInterval(conn.timer);
            conn.terminate();
            refreshOnlineClients(wss);
        }, 1000)
    }, 5000)

    conn.on('pong', () => {
        clearTimeout(conn.deathTimer)
    })
}

/**
 * 
 * @param {WebSocket} conn 
 * @param {WebSocketServer} wss
 */
function initMessageHandler(conn, wss) {
    conn.on('message', async (message) => {
        const messageData = JSON.parse(message.toString())
        const { recipient, text, file } = messageData;
        let filename = null;
        if (file) {
            console.log('size', file.data.length);
            const parts = file.name.split('.');
            const ext = parts[parts.length - 1];
            filename = Date.now() + '.' + ext;
            const path = __dirname + '/uploads/' + filename;
            const bufferData = new Buffer(file.data.split(',')[1], 'base64');
            fs.writeFile(path, bufferData, () => {
                console.log('file saved:' + path);
            });
        }
        if (recipient && (text || file)) {
            const doc = await db.messages.create(conn.userId, recipient, text, file ? filename : null);
            // console.log('created message');
            const payload = {
                message: {
                    _id: doc._id,
                    sender: conn.userId,
                    recipient,
                    text,
                    file: file ? filename : null,
                    createdAt: doc.createdAt
                }
            };
            [...wss.clients].filter(c => c.userId === recipient).forEach(c => c.send(JSON.stringify(payload)));
        }
    })
}

export {
    parseCookies,
    refreshOnlineClients,
    initConnectionTimer,
    initMessageHandler
}