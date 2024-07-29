const express = require("express");
const Server = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const app = express();


// middlewares
app.use(cors({
    origin:"http://192.168.1.19:3000"
}))


const server  = app.listen(process.env.PORT,()=>{
    console.log("server is running...",process.env.PORT);
})
interface User {
    socketId:string;
    username:string;
}
interface Game {
    gameId:string;
    hostId:string;
    joineeId:string | null;
}
const connectedUsers: User[] =[];
const games:Game[] = [];




const io =  Server(server,{
    cors:{
        origin:"http://192.168.1.19:3000",
        methods:["GET","POST"]
    }
})

function pushNewUser(socketId:string,username:string){
    const user = {socketId:socketId,username:username}
    const isUserPresent = connectedUsers.some((e)=>e.socketId === user.socketId);
    if(!isUserPresent){
        connectedUsers.push(user)
    }
    console.log(connectedUsers);
}

function createNewGame (gameId:string, hostId:string){
    const game = {gameId:gameId, hostId:hostId, joineeId:null};
    games.push(game);
    console.log("game created",games);
}

function joinGame (gameId:string,joineeId:string){
    games.forEach((game)=>{
        if(game.gameId === gameId){
            game.joineeId = joineeId;
        }
    });
    console.log(games);
}

function getGameById(gameId:string){
    return games.find((g)=>g.gameId === gameId);
}

function getUserBySocket(socketId:string){
    return connectedUsers.find((user)=>user.socketId === socketId)
}
io.on("connection",(socket:any)=>{
    console.log("socket connected",socket.id);

    

    socket.on("start-game",(data:{name:string,gameId:string})=>{
        const {name, gameId} = data;
            pushNewUser(socket.id,name);
            createNewGame(gameId,socket.id);    
    });

    socket.on("join-game",(data:{name:string,gameId:string})=>{
        const {name, gameId} = data;
        console.log("join game",data);
        pushNewUser(socket.id,name)
        joinGame(gameId, socket.id);
        const game = getGameById(gameId)

        socket.to(game?.hostId).emit("user-joined",name);
    });

    socket.on("move",(data:{box:number, player:string, gameId:string})=>{
        const {box, player, gameId} = data;
        const game = getGameById(gameId);
        const opponetId = game?.hostId===socket.id ? game?.joineeId : game?.hostId
        socket.to(opponetId).emit("opponent-moved",{box,player,gameId});

    });

    socket.on("winner",(gameId:string)=>{
        const game = getGameById(gameId);
        const user = getUserBySocket(socket.id);
        const opponetId = game?.hostId===socket.id ? game?.joineeId : game?.hostId
        socket.to(opponetId).emit("opponent-won",{name:user?.username});
    })



})