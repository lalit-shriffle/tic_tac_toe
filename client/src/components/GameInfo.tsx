import React, { useContext, useEffect, useState } from 'react'
import { gameContext } from '../context/gameContext.ts'
import { socket } from '../socket.ts';
import { userContext } from '../context/userContext.ts';

type Props = {}

const GameInfo = (props: Props) => {
    const [joinee, setJoinee] = useState(null);
    const {User, setUser} = useContext(userContext);
    const {gameId} = useContext(gameContext);

    useEffect(()=>{
       if(socket){
        socket.on("user-joined",(data)=>{
            setJoinee(data)
        })
       }
    },[socket]);


  return (
    <div className='flex flex-col  items-center w-full'>
        <div className='flex gap-2 justify-center items-center w-full'>
            <span>
                gameId :
            </span>
            <span>{gameId}</span>
        </div>
        {User?.isHost && <div className='flex gap-2 justify-center items-center w-full'>
            {joinee?
            <div className=''>
            <span>{joinee}</span>
            <span>
                 Joined the game
            </span>
            </div>
            :<>
            <span>waiting for joinee</span>
            </>
            }
        </div>}
    </div>
  )
}

export default GameInfo