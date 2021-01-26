"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs"), http = require("https");
var privateKey = fs.readFileSync(__dirname + '/a.key').toString();
var certificate = fs.readFileSync(__dirname + '/b.crt').toString();
var credentials = { key: privateKey, cert: certificate };
const debug = require("debug");
const App_1 = require("./App");
debug('ts-express:server');
const port = normalizePort(process.env.PORT || 3001);
App_1.default.set('port', port);
http.globalAgent.maxSockets = 100;
const server = http.createServer(credentials, App_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    if ((error.code == 'EACCES') || (error.code == 'EADDRINUSE')) {
        process.exit(1);
    }
    else {
        throw error;
    }
}
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}