import React, { useContext, useEffect, useState } from 'react'
import { socket } from '../socket.ts'
import { gameContext } from '../context/gameContext.ts'
import { userContext } from '../context/userContext.ts';


interface IHistory {
    totalGame : number;
    hostWon:number;
    joineeWon : number;
    gameTied:number;
}
type Props = {
    opponateWinnerName: string | null;
    winner : string | null;
    isGameTied: boolean;
}


const GameHistory = ({winner, opponateWinnerName,isGameTied}: Props) => {
    const [history, setHistory] = useState<IHistory | null>(null);
    const {User} = useContext(userContext);
    const {gameId} = useContext(gameContext);
    useEffect(()=>{
        if(socket){
            socket.emit("game-status",{gameId:gameId},(data)=>{
                setHistory(data);
            })
        }
    },[winner, opponateWinnerName,isGameTied])
  return (
    <div className=" rounded flex flex-col justify-center  items-stretch  shadow-black   w-[50vw] ">
        <div className='flex gap-2 items-center '>
            <span>Total Game :</span><span>{history?.totalGame}</span>
        </div>
        <div className='flex gap-2 items-center'>
            <span>Won :</span><span>{User?.isHost? history?.hostWon: history?.joineeWon }</span>
        </div>
        <div className='flex gap-2 items-center'>
            <span>Lost :</span><span>{User?.isHost? history?.joineeWon : history?.hostWon}</span>
        </div>
        <div className='flex gap-2 items-center'>
            <span>Tied :</span><span>{history?.gameTied }</span>
        </div>
    </div>
  )
}

export default GameHistory