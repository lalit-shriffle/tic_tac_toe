const express = require("express");
const Server = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const app = express();


// middlewares
app.use(cors({
    origin:process.env.CLIENT_URL
}))


const server  = app.listen(process.env.PORT,()=>{
    console.log("server is running...",process.env.PORT);
});


interface User {
    socketId:string;
    username:string;
}

interface Game {
    gameId:string;
    hostId:string;
    joineeId:string | null;
    hostWon:number;
    joineeWon:number;
    totalGame:number;
    gameTied: number
}

// user and game initailization
const connectedUsers: User[] =[];
const games:Game[] = [];

// socket server
const io =  Server(server,{
    cors:{
        origin:process.env.CLIENT_URL,
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
    const game = {gameId:gameId, hostId:hostId, joineeId:null, hostWon:0, totalGame:0, joineeWon:0, gameTied:0};
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

function gameTied(gameId:string){
    games.forEach((game)=>{
        if(game.gameId === gameId){
            game.gameTied += 1;
            game.totalGame += 1;
        }
    })
}

function addWinner (gameId:string,winnerId:string){
    games.forEach((game)=>{
        if(game.gameId === gameId){
            if(game.hostId === winnerId){
                game.hostWon += 1;
            }else{
                game.joineeWon += 1;
            }

            game.totalGame += 1;
        }
    })
}
// Event Listeners
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
        const game = getGameById(gameId);
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
        addWinner(gameId,socket.id);
        const opponetId = game?.hostId===socket.id ? game?.joineeId : game?.hostId
        socket.to(opponetId).emit("opponent-won",{name:user?.username});
        console.log(game);
    });

    socket.on("play-again",(data:{gameId:string})=>{
        const {gameId} = data;
        const game = getGameById(gameId);

        const opponetId = game?.hostId===socket.id ? game?.joineeId : game?.hostId;
        const user = getUserBySocket(socket.id);
        socket.to(opponetId).emit("play-again-request",{name:user?.username});
    });

    socket.on("request-accepted",(data:{gameId:string})=>{
        const {gameId} = data;
        const game = getGameById(gameId);
        const opponetId = game?.hostId===socket.id ? game?.joineeId : game?.hostId;

        const user = getUserBySocket(socket.id);

        socket.to(opponetId).emit("your-request-accepted",{name:user?.username});
    });

    socket.on("request-rejected",(data:{gameId:string})=>{
        const {gameId} = data;
        const game = getGameById(gameId);
        const opponetId = game?.hostId===socket.id ? game?.joineeId : game?.hostId;

        const user = getUserBySocket(socket.id);

        socket.to(opponetId).emit("your-request-rejected",{name:user?.username});
    });

    socket.on("game-tied",(data:{gameId:string})=>{
        const {gameId} = data;
        console.log("game tied",gameId);
        gameTied(data.gameId);
        console.log(games);
    });

    socket.on("game-status",(data:{gameId:string},callback:(data:any)=>void)=>{
        const {gameId} = data;
        const game = getGameById(gameId);
        callback(game);
    })
    


})